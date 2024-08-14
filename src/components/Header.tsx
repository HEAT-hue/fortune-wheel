'use client'
import Image from "next/image"

const Header = () => {
    return (
        <>
            <header className="absolute w-full px-4 z-[21]">
                <nav className="container mx-auto flex justify-between items-center py-3">

                    {/* Ecobank Logo */}
                    <Image src="/images/super_rewards.svg" width={188} height={106} alt="logo" />

                    <div className="hidden sm:block"></div>
                </nav>
            </header>
        </>
    )
}

export default Header