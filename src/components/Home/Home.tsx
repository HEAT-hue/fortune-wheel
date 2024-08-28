'use client'
import { CSVSVG, GearSVG, ThrashSVG, UploadSVG } from "@/components/svgs";
import { CSVFileype, WinnerType } from "@/lib/definitions";
import { csvToJson } from "@/lib/utils";
import { Modal } from "antd";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
// import ErrorImg from "../../../../../public/images/error.webp";
import Image from "next/image";
import { Select } from 'antd';

// import { Kalam } from "next/font/google";

// Configure the Kalam font
// const kalam = Kalam({
//     weight: ['300', '400', '700'], // Specify the weights you need
//     subsets: ['latin'], // Specify subsets if needed
// });

type HomePageProps = {
    setRandomRecord: Dispatch<SetStateAction<WinnerType[]>>
    setViewIndex: Dispatch<SetStateAction<number>>
    title: string
    setTitle: Dispatch<SetStateAction<string>>
    category: string
    setCategory: Dispatch<SetStateAction<string>>
}

const HomePage: React.FunctionComponent<HomePageProps> = ({ setRandomRecord, setViewIndex, title, setTitle, setCategory }) => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    // CSV file containing all details
    const [file, setFile] = useState<File | null>(null);
    const [err, setErr] = useState<string | null>(null);
    const [winnersCount, setWinnersCount] = useState<string>("1");
    const [loading, setLoading] = useState<boolean>(false);

    // Clean resources
    useEffect(() => {
        return () => {
            setFile(null);
            setErr(null);
            setWinnersCount("1");
            setLoading(false);
        }
    }, [])

    // Button to accept file
    const handleClick = () => {
        fileInputRef?.current?.click();
    };

    // File change
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }

        // Get File
        const file = e.target.files[0];

        // Validate file extension
        if (!file.type.match(CSVFileype)) {
            setErr("File selected must be a CSV file");
            // Reset the file input value
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            return;
        }

        setFile(e.target.files[0]);

        // Reset the file input value
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Upload file
    const handleUpload = async () => {
        // Upload CSV file
        if (!file) {
            setErr("Upload a CSV file");
            // Reset the file input value
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            return
        };


        // Random winners not selected
        if (!winnersCount) {
            setErr("Missing value for random count");
            // Reset the file input value
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            return
        }

        // Prepare form data for upload// import EcoImg from "../../../../public/images/ecos.jpeg";
        const formData = new FormData();
        formData.append('file', file);
        formData.append('subset', winnersCount.toString());

        setLoading(true);


        // Upload form
        const response = await fetch('/api/random', {
            method: 'POST',
            body: formData,
        });

        // Check status of response
        if (response.ok) {
            // data
            const data = await response.json();
            const result = csvToJson(data);
            setRandomRecord(result);
            setViewIndex(1);
        }

        // Error occurred
        else {
            let errorMessage = 'An error occurred';
            try {
                // Try to parse the response as JSON
                const errorData = await response.json();
                if (errorData && errorData.error) {
                    errorMessage = errorData.error;
                }
            } catch (e) {
                // If response is not JSON, read it as text
                errorMessage = await response.text();
            }
            setErr(errorMessage);
        }
    };

    // Open modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        handleUpload();
    };


    const handleCancel = () => {
        // Reset the file input value
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        setIsModalOpen(false);
    };

    return (

        <>
            {/* Main viewing area */}
            <main className="h-full flex jutify-center items-center">
                <button
                    className="flex items-center justify-center bg-[#004773] border border-transparent rounded-sm shadow-sm text-[#E5E5E5] cursor-pointer tracking-widest font-medium text-2xl leading-snug px-3 py-3 relative no-underline transition-all duration-250 select-none touch-action-manipulation align-baseline w-[20rem] h-[4rem] hover:bg-[#004773]/80 hover:shadow-lg hover:-translate-y-1 focus:bg-[#0073a1] focus:shadow-lg active:bg-[#004a5e] active:shadow-sm active:translate-y-0 opacity-95" role="button"
                    onClick={showModal}
                >
                    <span className={"font-Killam-Bold"}>Start</span>
                </button>
            </main>

            {/* Modal to Upload CSV File */}
            <Modal title={<>Super Rewards</>} open={isModalOpen} className="z-[]" loading={loading} onOk={handleOk} onCancel={handleCancel}>
                <div className="flex flex-col gap-y-4">
                    {/* Category */}
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="input" className="font-medium text-[18px]">Category</label>
                        <Select
                            placeholder="Select Category"
                            style={{ width: "100%", height: 45 }}
                            onChange={(e) => {
                                setCategory(e);
                            }}
                            options={[
                                { value: 'Monthly Draw', label: 'Monthly Draw' },
                                { value: 'Quarterly Draw', label: 'Quarterly Draw' },
                                { value: 'Grand Prize', label: 'Grand Prize' },
                            ]}
                        />
                    </div>

                    {/* Division */}
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="input" className="font-medium text-[18px]">Division</label>
                        <Select
                            placeholder="Select Division"
                            style={{ width: "100%", height: 45 }}
                            onChange={(e) => {
                                setTitle(e);
                            }}
                            options={[
                                { value: 'Lagos', label: 'Lagos' },
                                { value: 'FCT & North', label: 'FCT & North' },
                                { value: 'Southsouth & Southeast', label: 'Southsouth & Southeast' },
                                { value: 'Southwest', label: 'Southwest' },
                            ]}
                        />
                    </div>

                    {/* Custom Upload file */}
                    <div className="flex flex-col gap-y-3">
                        {/* Files Uploaded */}
                        {file && (
                            <div className="mt-4 border border-pry p-3 flex justify-between items-center rounded">
                                <div className="flex gap-x-3 items-center justify-center">
                                    <CSVSVG width={30} height={30} />
                                    <p>{file.name}</p>
                                </div>
                                <button
                                    className="text-red-900 block"
                                    onClick={() => {
                                        setFile(null);
                                    }}
                                ><ThrashSVG /></button>
                            </div>
                        )}

                        <div className="flex flex-col">
                            {/* Upload button */}
                            {!file && (
                                <div>
                                    <input ref={fileInputRef} onChange={handleFileChange} className="hidden border border-red-600" type="file" id="upload file" />
                                    <button
                                        className="p-2 px-3 border border-[#adaaaa] shadow-sm flex gap-x-3 items-center rounded"
                                        type="button"
                                        onClick={handleClick}
                                    >
                                        <UploadSVG />
                                        <div>Upload</div>
                                    </button>
                                </div>
                            )}

                            <div className="mt-5 flex flex-col gap-y-1 w-max">
                                <p>Random Winners</p>

                                {/* Random winners selection */}
                                {/* Capture Quantity Input from User */}
                                <input
                                    type="text"
                                    className="bg-gray-200 w-[40px] text-center p-1 rounded-t-sm border-b-2 border-b-black outline-none"
                                    inputMode="numeric" // Display the user numeric keypad
                                    // Ensure only digits from 1 to 9 is entered and nothing else
                                    value={winnersCount}
                                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        e.target.value = e.target.value
                                            .replace(/[^0-9]/g, "")
                                            .replace(/(\..*)\./g, "$1");
                                    }}
                                    onChange={(e) => setWinnersCount(e.target.value)}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </Modal>

            {/* Error Modal */}
            {<Modal
                footer={
                    <button className="bg-pry text-white rounded p-1 px-3" onClick={() => setErr(null)}>
                        Ok
                    </button >
                }
                width={350}
                open={err != null}
                onCancel={() => setErr(null)}
                className="z-[100000000000000000000000000000000000000]"
            >
                <div className="flex items-start gap-3">
                    <Image width={20} height={20} src={"/images/error.webp"} alt="error" />
                    <div className="flex flex-col gap-y-3">
                        <h3 className="font-medium text-xl leading-none">Error</h3>
                        <p className="">{err}</p>
                    </div>
                </div>
            </Modal >}
        </>
    )
}

function Config() {
    return (
        <div className="flex gap-x-2 items-center">
            <div>Edit configurations </div>
            <div><GearSVG /></div>
        </div>
    )
}

export default HomePage