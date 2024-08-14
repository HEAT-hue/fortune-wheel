import { WinnerType } from "./definitions";

export function generateUniqueRandomNumbers(count: number, min: number, max: number): number[] {
    const uniqueNumbers = new Set<number>();

    while (uniqueNumbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        uniqueNumbers.add(randomNumber);
    }

    const uniqueNumbersArray: number[] = [];

    uniqueNumbers.forEach(value => uniqueNumbersArray.push(value));

    return uniqueNumbersArray;
}

export function csvToJson(csvString: string): WinnerType[] {
    const lines = csvString.trim().split('\n');
    const result: any[] = [];

    lines.forEach(line => {
        const [name, email, accountNumber, phoneNumber, branchName] = line.split(',');
        result.push({ name, email, accountNumber, phoneNumber, branchName });
    });

    return result;
}

export function maskAccountNumber(accountNumber: string) {
    // Ensure the input is a string
    accountNumber = accountNumber.toString();

    // Replace the middle digits with 'xxxx'
    let maskedNumber = accountNumber.slice(0, 3) + 'xxxx' + accountNumber.slice(-3);

    return maskedNumber;
}