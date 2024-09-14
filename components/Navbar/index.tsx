"use client"
import { useState } from "react";
import Logo from "@/public/assets/img/Logo.png";
import Image from "next/image";
import { Inria_Sans } from 'next/font/google'

const InriaSansFont = Inria_Sans({
    weight: '400',
    subsets: ['latin']
})


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="fixed md:px-44 h-16 bg-black flex items-center justify-between w-full px-4 z-50 text-white">
            {/* Text Ecoute */}
            <div className="flex-1 md:flex">
                <Image src={Logo.src} alt="Ecoute" width={80} height={80} />
            </div>

            {/* Logo di Tengah */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 flex-1 space-x-12 hidden md:flex ${InriaSansFont.className}`}>
                <a className="font-bold text-md border-b-2 border-[#9986BD]">About Us</a>
                <a className="font-bold text-md">What We Do</a>
                <a className="font-bold text-md">Portfolio</a>
                <a className="font-bold text-md">Contact</a>
            </div>

            <div>
            
            </div>

            {/* Burger Menu for Mobile */}
            <div className="md:hidden ml-auto">
                <button onClick={toggleMenu} className="focus:outline-none">
                    {/* Burger icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#9986BD]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            {/* Dropdown Menu (Mobile) */}
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-black text-white shadow-md flex flex-col items-center space-y-4 py-4">
                    <a className="font-bold text-md" onClick={toggleMenu}>About Us</a>
                    <a className="font-bold text-md" onClick={toggleMenu}>What We Do</a>
                    <a className="font-bold text-md" onClick={toggleMenu}>Portfolio</a>
                    <a className="font-bold text-md" onClick={toggleMenu}>Contact</a>
                </div>
            )}
        </nav>
    );
}
