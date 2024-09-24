import React, { useState } from 'react';
import { FiShoppingBag, FiUser, FiSearch, FiMenu } from 'react-icons/fi';
import { IoCloseOutline } from "react-icons/io5";

const Navbar = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);

    const handleSearchClick = () => {
        setIsSearchActive(true);
    };

    const handleCloseSearch = () => {
        setIsSearchActive(false);
    };

    return (
        <div>
            {/* Navbar */}
            <div className="fixed top-0 w-full bg-white z-10 py-5 shadow-md">
                <div className="relative flex items-center w-4/5 mx-auto transition-all duration-300">
                    {/* Left Section */}
                    <div className={`flex items-center space-x-2 transition-all duration-300 ${isSearchActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        <button className="flex items-center text-sm font-semibold">
                            <span className="mr-1">+</span> Contact Us
                        </button>
                    </div>

                    {/* Center Section or Search Bar */}
                    <div className={`absolute transition-all duration-300 ${isSearchActive ? 'left-0' : 'left-1/2 transform -translate-x-1/2'} right-0 mx-auto text-center`}>
                        {!isSearchActive ? (
                            <div className="text-4xl font-cormorant font-bold">MINACIA</div>
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
                    <div className="flex items-center space-x-4 ml-auto">
                        {!isSearchActive ? (
                            <div className="flex items-center space-x-4">
                                <FiShoppingBag size={20} />
                                <FiUser size={20} />
                                <FiSearch size={20} className="cursor-pointer" onClick={handleSearchClick} />
                                <button className="flex items-center space-x-1">
                                    <FiMenu size={20} />
                                    <span className="text-sm font-semibold">MENU</span>
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
