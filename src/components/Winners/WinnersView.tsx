'use client'
import { WinnerType } from '@/lib/definitions';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { maskAccountNumber } from '@/lib/utils';
import * as XLSX from 'xlsx';

type WinnrsViewType = {
    randomRecord: WinnerType[]
    title: string
    category: string
    setShowConfetti: Dispatch<SetStateAction<boolean>>
}

const WinnersView: React.FC<WinnrsViewType> = ({ randomRecord, title, category, setShowConfetti }) => {
    const [downloaded, setDownloaded] = useState<boolean>(false);

    useEffect(() => {
        setShowConfetti(true);

        return () => {
            setShowConfetti(false);
        }
    }, [])

    useEffect(() => {
        if (downloaded) {
            return;
        }

        // Convert JSON data to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(randomRecord);

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

        // URL
        const url = URL.createObjectURL(blob);

        // Set the URL to the blob
        link.href = url

        // Set the download attribute to the desired file name
        link.download = `${title} ${category}.xlsx`;

        // Append the link to the document body
        document.body.appendChild(link);

        // Trigger the download by clicking the link
        link.click();

        // Clean up and remove the link
        document.body.removeChild(link);

        // Revoke object URL
        URL.revokeObjectURL(url);

        setDownloaded(true);
    }, [])


    return (
        <div className="relative w-full h-full">
            <h1 className='text-[#FABA02] text-3xl mb-2 text-center'>{`${category} Category`}</h1>
            <h1 className='text-white text-lg font-extrabold text text-center'>Congratulations {" "}<span className='text-sec font-bold'>{title}</span> {" "} winners!</h1>
            <div id="largegenerictable" className="flex flex-col gap-2 text-[16px] mt-3 h-[70vh] overflow-y-auto">
                <table className="w-full border-separate border-spacing-y-4 pb-[5rem]">
                    <thead className="">
                        <tr id="header" className="text-white pb-20">
                            <th className="">S/N</th>
                            <th className="font-Gilroy-SemiBold">
                                Account Name
                            </th>
                            <th className="font-Gilroy-SemiBold">
                                Account Number
                            </th>
                            <th className="font-Gilroy-SemiBold">
                                Branch Name
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {randomRecord.map((record: WinnerType, index) => {
                            return (
                                <tr
                                    id="staff"
                                    key={index}
                                    className="text-center tablerow bg-[#F4F4F4] text-[14px] text-[#4D4D4D]"
                                >
                                    {" "}
                                    <td className="rounded-l whitespace-nowrap">{index + 1}</td>
                                    <td
                                        className={`px-6 py-4 border-none whitespace-nowrap font-Gilroy-Regular`}
                                    >
                                        {record.name}
                                    </td>
                                    <td
                                        className={`px-6 py-4 border-none whitespace-nowrap font-Gilroy-Regular`}
                                    >
                                        {maskAccountNumber(record.accountNumber)}
                                    </td>
                                    <td
                                        className={`rounded-r px-6 py-4 border-none whitespace-nowrap font-Gilroy-Regular`}
                                    >
                                        {record.branchName}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div >
            {/* <div className='w-max ml-auto gap-x-2 mt-2 mr-3'>
                <DownloadRecord records={randomRecord} title={title} category={category} />
            </div> */}
        </div>
    )
}

export default WinnersView