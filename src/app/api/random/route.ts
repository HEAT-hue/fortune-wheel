import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import readline from 'readline';
import { File } from 'buffer';
import path from 'path';
import { generateUniqueRandomNumbers } from '@/lib/utils';

export const runtime = "nodejs";
export const preferredRegion = ["all"];

interface CSVFile extends File {
    filepath: string;
}

// Get total records of csv file
const getTotalRecords = (filePath: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        let count = 0;
        const rl = readline.createInterface({
            input: fs.createReadStream(filePath),
            crlfDelay: Infinity,
        });

        rl.on('line', (line) => {
            count++;
        });

        rl.on('close', () => {
            resolve(count);
            rl.close();
        });

        rl.on('error', (error) => {
            reject(error);
        });
    });
};


// Retieve record by index
const getRecordByIndex = (filePath: string, index: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        let count = 0;
        const rl = readline.createInterface({
            input: fs.createReadStream(filePath),
            crlfDelay: Infinity,
        });

        rl.on('line', (line) => {
            if (count === index) {
                resolve(line);
                rl.close();
            }
            count++;
        });

        rl.on('close', () => {
            if (count <= index) {
                reject(new Error('Index out of bounds'));
            }
        });

        rl.on('error', (error) => {
            reject(error);
        });
    });
};

// Get subset of records
async function getRecordsSubset(indexes: number[], filePath: string): Promise<string> {
    let result = "";

    for (const index of indexes) {
        const record = await getRecordByIndex(filePath, index);
        result += record + '\n';
    }

    return result;
}


// Api ROUTE to get file from Client
export async function POST(request: NextRequest) {
    const data = await request.formData(); // Define the path where the file will be saved

    // Get file from  FormData
    const file: File | null = data.get('file') as unknown as File;

    // Get max subset from FormData
    const subset: number = parseInt(data.get('subset') as string) || 5;

    if (!file) {
        return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const currentDirectory = path.resolve('./');

    // Specify the file path on server
    const filePath = path.join(currentDirectory, '/tmp', file.name);

    // Write file sync to ensure complete operation before processing
    try {
        fs.writeFileSync(filePath, buffer);
    } catch (err: any) {
        return (NextResponse.json({ err: "Error writing files" }, { status: 500 }));
    }

    // Generate random records
    try {
        const totalRecords = await getTotalRecords(filePath);

        if (totalRecords <= subset) {
            return (NextResponse.json({ error: "Number of random winners selected not less than total length of record." }, { status: 500 }));
        }

        const randomIndexes = generateUniqueRandomNumbers(subset, 0, totalRecords - 1);

        let randomRecords = await getRecordsSubset(randomIndexes, filePath);

        // Clean up temporary file
        // try {
        //     fs.unlinkSync(filePath);
        // } catch (err) {
        //     console.error("Error cleaning up file:", err);
        // }

        return (NextResponse.json(randomRecords, { status: 200 }));
    } catch (error) {
        return (NextResponse.json({ error: "Error calculating records winners" }, { status: 500 }));
    }
}