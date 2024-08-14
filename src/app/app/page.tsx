'use client'
import ConfettiEffect from "@/components/ConfettiEffect";
import Header from "@/components/Header";
import { WinnerType } from "@/lib/definitions";
import { useState } from "react";
import Image from "next/image";
import { HomeView } from "@/components";
import { ProcessingView } from "@/components/Processing";
import { WinnersView } from "@/components/Winners";

export default function Home() {
    // View index to render different views
    const [viewIndex, setViewIndex] = useState<number>(0);

    // Set the title of records
    const [title, setTitle] = useState<string>("");

    // Set Category
    const [category, setCategory] = useState<string>("");

    // Data of selected records
    const [randomRecord, setRandomRecord] = useState<WinnerType[]>([]);

    // Handle display of confetti
    const [showConfetti, setShowConfetti] = useState<boolean>(false);

    const views: any = [
        <HomeView key={0} category={category} setCategory={setCategory} setViewIndex={setViewIndex} setRandomRecord={setRandomRecord} title={title} setTitle={setTitle} />,
        <ProcessingView key={1} setViewIndex={setViewIndex} randomRecord={randomRecord} />,
        <WinnersView key={2} randomRecord={randomRecord} title={title} setShowConfetti={setShowConfetti} category={category} />
    ];

    return (
        <>
            <div className="h-screen overflow-hidden relative grid grid-cols-1 grid-rows-[auto,_1fr]">

                {/* React Confetti */}
                {
                    showConfetti && (
                        <div className='z-[100] absolute inset-0'><ConfettiEffect /></div>
                    )
                }

                {/* Page header */}
                <Header setViewIndex={setViewIndex} />

                <main className="h-screen relative overflow-hidden flex flex-col justify-center items-center border border-red-800">
                    {/* Rotating background image */}
                    {viewIndex != 2 && (
                        <div className="absolute inset-0 z-[20] rotating-background bg-[url('/images/bg_skin.png')] bg-contain bg-center bg-no-repeat"></div>
                    )}
                    <div className="absolute inset-0 bg-[#046FC0]"></div>

                    {/* Hero text */}
                    {viewIndex != 2 && (
                        <div className="absolute top-0 z-[24] inset-x-0 flex justify-center mt-[3rem]">
                            <Image src="/images/rewards_text.png" width={356} height={260} alt="Join the millionaire geng" />
                        </div>
                    )}

                    {/* Raffle Text */}
                    {viewIndex != 2 && (
                        <div className="z-[50] absolute top-[40vh]">
                            <Image src="/images/raffle_draw.svg" width={293} height={128} alt="raffle draw" />
                        </div>
                    )}

                    <div className={`absolute ${viewIndex != 2 ? "top-[60vh]" : "top-[5vh]"} bottom-0 z-[200]`}>
                        {
                            views[viewIndex]
                        }
                    </div>
                </main>
            </div>
        </>
    )

}