'use client'
import { WinnerType } from '@/lib/definitions';
import { Modal } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DownloadRecord from '../DownloadRecord/DownloadRecord';
import { maskAccountNumber } from '@/lib/utils';
// import './custom-modal.css';


type WinnrsViewType = {
    randomRecord: WinnerType[]
    title: string
    category: string
    setShowConfetti: Dispatch<SetStateAction<boolean>>
}

const WinnersView: React.FC<WinnrsViewType> = ({ randomRecord, title, category, setShowConfetti }) => {
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setShowConfetti(true);

        return () => {
            setShowConfetti(false);
        }
    }, [])

    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    // Reload page
    function reloadPage() {
        window.location.reload();
    }

    return (
        <div className="relative w-full h-full">
            <h1 className='text-[#FABA02] text-3xl mb-2'>{`${category} Category`}</h1>
            <h1 className='text-white text-lg font-extrabold text'>Congratulations {" "}<span className='text-sec font-bold'>{title}</span> {" "} winners!</h1>
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
            <div className='w-max ml-auto gap-x-2 mt-2 mr-3'>
                <DownloadRecord records={randomRecord} title={title} category={category} />
            </div>
            {/* <Modal
                title={
                    <p className="text-xl font-bold">
                        <span className={"font-ABeeZee-Regular"}>Congratulations! {title}</span>

                    </p>
                }
                footer={
                    <div className='flex gap-x-2 mt-9'>
                        <DownloadRecord records={randomRecord} title={title} category={category} />
                        <button className='border border-pry text-pry p-2 rounded text-sm' onClick={reloadPage}>
                            Close
                        </button>
                    </div>
                }
                loading={loading}
                open={open}
                onCancel={() => setOpen(true)}
                className="custom-ant-modal"
            >
                <div className='grid grid-cols-3 gap-2'>
                    {randomRecord?.map((winner: any, index: number) => {
                        const { name, email, accountNumber, phoneNumber } = winner
                        return (
                            <div key={index} className='pt-2 mt-1'>
                                <div className='text sm:text-lg font-bold text-gray-500'>
                                    <span className={"font-ABeeZee-Regular"}>{name ?? "Unknown Names"}</span>
                                </div>
                                <div>{accountNumber ?? "Unknown Account number"}</div>
                            </div>
                        )
                    })}
                </div>
            </Modal> */}
        </div>
    )
}

export default WinnersView