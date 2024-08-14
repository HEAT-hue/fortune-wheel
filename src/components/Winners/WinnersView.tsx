'use client'
import { WinnerType } from '@/lib/definitions';
import { Modal } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DownloadRecord from '../DownloadRecord/DownloadRecord';
// import './custom-modal.css';


type WinnrsViewType = {
    randomRecord: WinnerType[] | null
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
            <Modal
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
            </Modal>
        </div>
    )
}

export default WinnersView