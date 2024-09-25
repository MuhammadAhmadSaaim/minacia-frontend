import React, { useState, useEffect } from 'react';
import { FiShoppingBag, FiUser, FiSearch, FiMenu } from 'react-icons/fi';
import { IoCloseOutline } from "react-icons/io5";

const Navbar = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) { 
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

    const handleSearchClick = () => {
        setIsSearchActive(true);
    };

    const handleCloseSearch = () => {
        setIsSearchActive(false);
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);

    };

    return (
        <div className="relative">
            <div className="relative h-screen flex justify-center bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/images/background.png')" }}
>
    <div className="absolute inset-0 bg-black opacity-65" />
    <h1
        className={`text-6xl sm:text-10xl mt-48 ml-2 md:text-10xl lg:text-11xl lg:tracking-40px sm:tracking-wider tracking-widest text-white font-bold transition-all duration-700 ease-in-out${
            isScrolled ? 'opacity-0 translate-y-[-100%] scale-50 text-black' : 'opacity-100 translate-y-0 scale-100'
        }`}
    >
        MINACIA
    </h1>
</div>


            {/* Navbar */}
            <div className="fixed top-0 w-full bg-white z-30 py-5 shadow-md transition-all duration-700 ease-in-out">
                <div className="relative flex items-center w-4/5 mx-auto">
                    {/* Left Section */}
                    <div
                        className={`flex items-center space-x-2 transition-all duration-500 ${isSearchActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                    >
                        <button className="flex items-center text-sm font-semibold">
                            <span className="mr-1">+</span> Contact Us
                        </button>
                    </div>

                    {/* Center Section or Search Bar */}
                    <div
                        className={`absolute transition-all duration-700 ease-in-out ${
                            isSearchActive ? 'left-0 opacity-100' : 'left-1/2 transform -translate-x-1/2 opacity-100'
                        } right-0 text-center`}
                    >
                        {!isSearchActive ? (
                            <div
                                className={`text-4xl font-cormorant font-bold transition-all duration-700 ease-in-out ${
                                    isScrolled ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-10 scale-75'
                                }`}
                            >
                                MINACIA
                            </div>
                        ) : (
                            <div className="flex items-center justify-between w-full">
                                <div className="text-4xl font-cormorant font-bold">MINACIA</div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="py-1 px-3 border border-gray-300 rounded-lg focus:outline-none w-64" // Changed width here
                                        autoFocus
                                    />
                                    <button
                                        onClick={handleCloseSearch}
                                        className="ml-2 text-sm font-semibold cursor-pointer"
                                    >
                                        <IoCloseOutline size={20} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Section */}

                     <div className="flex items-center space-x-4 ml-auto transition-all duration-700 ease-in-out">
                        {!isSearchActive ? (
                            <div className="flex items-center space-x-4">
                                <FiShoppingBag size={20} />
                                <FiUser size={20} />
                                <FiSearch size={20} className="cursor-pointer transition-all duration-500" onClick={handleSearchClick} />
                                <button className="flex items-center space-x-1">
                                    <FiMenu size={20} />
                                    <span className="text-sm font-semibold">MENU</span>
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            {/* Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-500 ease-in-out">
                    <div className="fixed right-0 top-0 w-64 h-full bg-white shadow-lg z-40 transition-transform duration-500 ease-in-out transform translate-x-0">
                        <button onClick={handleMenuToggle} className="p-4 text-right">Close Menu</button>
                        {/* Add your menu items here */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;




