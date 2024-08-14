'use client'
import Image from "next/image"
import { Dispatch, SetStateAction } from "react"

type HeaderProp = {
    setViewIndex: Dispatch<SetStateAction<number>>
}

const Header: React.FC<HeaderProp> = ({ setViewIndex }) => {

    // Reload page
    function reloadPage() {
        setViewIndex(0);
    }

    return (
        <>
            <header className="absolute w-full px-4 z-[20000]">
                <nav className="container mx-auto flex justify-between items-center py-3">

                    {/* Ecobank Logo */}
                    <Image src="/images/super_rewards.svg" className="cursor-pointer" onClick={reloadPage} width={188} height={106} alt="logo" />

                    <div className="hidden sm:block"></div>
                </nav>
            </header>
        </>
    )
}

export default Header