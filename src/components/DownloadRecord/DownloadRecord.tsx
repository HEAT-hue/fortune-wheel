'use client'
import { WinnerType } from '@/lib/definitions';
import * as XLSX from 'xlsx';

type DownloadRecordProp = {
    records: WinnerType[] | null
    title: string
    category: string
}

const DownloadRecord: React.FunctionComponent<DownloadRecordProp> = ({ records, category, title }) => {

    console.log(records);
    console.log(category);
    console.log(title);

    const handleDownload = () => {
        if (!records) {
            return;
        }

        // Convert JSON data to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(records);

        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Generate a binary string from the workbook
        const workbookOut = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'binary',
        });

        // Convert binary string to array buffer
        const s2ab = (s: any) => {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i < s.length; i++) {
                view[i] = s.charCodeAt(i) & 0xff;
            }
            return buf;
        };

        // Create a blob from the array buffer
        const blob = new Blob([s2ab(workbookOut)], { type: 'application/octet-stream' });

        // Create a link element
        const link = document.createElement('a');

        // Set the URL to the blob
        link.href = URL.createObjectURL(blob);

        // Set the download attribute to the desired file name
        link.download = 'data.xlsx';

        // Append the link to the document body
        document.body.appendChild(link);

        // Trigger the download by clicking the link
        link.click();

        // Clean up and remove the link
        document.body.removeChild(link);
    };

    return (
        <div>
            <button className='bg-pry font-Inter-Regular text-white p-2 rounded text-sm' onClick={handleDownload}>Download Records</button>
        </div>
    );
}

export default DownloadRecord