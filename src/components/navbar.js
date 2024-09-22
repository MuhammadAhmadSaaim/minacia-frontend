import React, { useState, useEffect } from 'react';
import { FiShoppingBag, FiUser, FiSearch, FiMenu } from 'react-icons/fi';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            {/* Large Name centered */}
            {!isScrolled && (
                <div className="flex justify-center items-center h-screen">
                    <h1 className="text-6xl font-cormorant font-bold transition-transform duration-700 ease-in-out transform scale-100">
                        MINACIA
                    </h1>
                </div>
            )}

            {/* Navbar */}
            <div
                className={`fixed top-0 w-full bg-white z-10 transition-all duration-500 ease-in-out ${isScrolled ? 'py-4 opacity-100' : 'opacity-0 py-0'
                    } border-b border-gray-200`}
            >
                <div className="flex justify-between items-center px-6">
                    {/* Left Section */}
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center text-sm font-semibold">
                            <span className="mr-1">+</span> Contact Us
                        </button>
                    </div>

                    {/* Center Section */}
                    <div className={`text-2xl font-cormorant font-bold ${isScrolled ? 'block' : 'hidden'}`}>
                        MINACIA
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        <FiShoppingBag size={20} />
                        <FiUser size={20} />
                        <FiSearch size={20} />
                        <button className="flex items-center space-x-1">
                            <FiMenu size={20} />
                            <span className="text-sm font-semibold">MENU</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
