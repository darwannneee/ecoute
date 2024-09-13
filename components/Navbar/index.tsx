"use client"
import { useState } from "react";
import Logo from "@/public/assets/img/Logo.png";
import Image from "next/image";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="fixed md:px-44 h-16 bg-transparent flex items-center justify-between w-full px-4 text-black z-50 bg-[#EEECEB]">
            {/* Text Ecoute */}
            <div className="flex-1 hidden md:flex">
                <h1>Ecoute.</h1>
            </div>

            {/* Logo di Tengah */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <Image src={Logo.src} alt="Ecoute" width={50} height={50} />
            </div>

            {/* Navigation Links di Kanan (Desktop) */}
            <div className="flex-1 space-x-12 hidden md:flex justify-end">
                <a className="font-bold text-md">About Us</a>
                <a className="font-bold text-md">What We Do</a>
                <a className="font-bold text-md">Portfolio</a>
                <a className="font-bold text-md">Contact</a>
            </div>

            {/* Burger Menu (Mobile) */}
            <div className="md:hidden">
                <button onClick={toggleMenu} className="flex flex-col items-center justify-center w-8 h-8 relative group focus:outline-none">
                    {/* Custom Animated Burger Icon */}
                    <div className={`w-6 h-0.5 bg-black mb-1.5 transform transition duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-black mb-1.5 transform transition duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-black transform transition duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                </button>
            </div>

            {/* Dropdown Menu (Mobile) */}
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4">
                    <a className="font-bold text-md" onClick={toggleMenu}>About Us</a>
                    <a className="font-bold text-md" onClick={toggleMenu}>What We Do</a>
                    <a className="font-bold text-md" onClick={toggleMenu}>Portfolio</a>
                    <a className="font-bold text-md" onClick={toggleMenu}>Contact</a>
                </div>
            )}
        </nav>
    );
}
