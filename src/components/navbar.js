import React, { useState, useEffect } from 'react';
import { FiShoppingBag, FiUser, FiSearch, FiMenu } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import MenuDrawer from './menuDrawer';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navbar = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const token = useSelector((state) => state.token.token);


    // Get the current location (URL)
    const location = useLocation();

    // Check if the user is on the home page
    const isHomePage = location.pathname === '/'; // Assuming home page is at "/"
    const isLaunchPage = location.pathname === '/launch';


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
            window.removeEventListener('scroll',
                handleScroll);
        };
    }, []);

    const
        handleSearchClick = () => {
            setIsSearchActive(true);
        };

    const handleCloseSearch = () => {
        setIsSearchActive(false);
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Don't render Navbar on /launch
    if (isLaunchPage) return null;


    return (
        <div className="relative z-30">
            {/* Background Section */}
            {isHomePage && (
                <div className="relative h-screen flex justify-center bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/mainImage.png')" }}
                >
                    <div className="absolute inset-0 bg-black opacity-65" />
                    <h1
                        className={`
    text-6xl font-cormorant sm:text-10xl mt-48 ml-2 md:text-10xl lg:text-11xl
    lg:tracking-40px sm:tracking-wider tracking-widest
    font-bold sm:transition-all duration-700 ease-in-out
    ${isScrolled ? 'opacity-0 translate-y-[-100%] scale-50 blur-sm' : 'opacity-100 translate-y-0 scale-100 blur-0'}
    ${isSearchActive ? 'opacity-0' : 'text-white'}
  `}
                    >
                        MINACIA
                    </h1>


                </div>
            )}

            {/* Navbar */}
            <div className="fixed top-0 w-full bg-white z-30 py-6 shadow-md transition-all duration-700 ease-in-out">
                <div className="relative flex items-center w-4/5 mx-auto">
                    {/* Left Section */}
                    <div
                        className={`flex items-center space-x-2 ${isSearchActive ? 'opacity-0' : 'opacity-100'}`}
                    >
                        <a href="/" className="flex items-center text-sm font-semibold">
                            Home
                        </a>
                    </div>
                    {/* Center Section or Search Bar */}
                    <div
                        className={`absolute ${isSearchActive ? 'left-0 opacity-100' : 'left-1/2 transform -translate-x-1/2 opacity-100'} right-0 text-center`}
                    >

                        {!isSearchActive ? (
                            <a href="/all-products" className="hidden sm:block">
                                <div
                                    className={`
                                text-4xl font-cormorant font-bold 
                                transition-all duration-700 ease-in-out
                                ${isHomePage
                                            ? isScrolled
                                                ? 'opacity-100 translate-y-0 scale-100 blur-0 pointer-events-auto'
                                                : 'opacity-0 translate-y-10 scale-75 blur-sm pointer-events-none'
                                            : ''}
                              `}
                                >
                                    MINACIA
                                </div>
                            </a>


                        ) : (
                            <div className="flex items-center justify-between w-full">
                                <div className="text-4xl font-cormorant font-bold">MINACIA</div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="py-1 px-3 border border-gray-300 rounded-lg focus:outline-none w-64"
                                        autoFocus
                                    />
                                    <button onClick={handleCloseSearch} className="ml-2 text-sm font-semibold cursor-pointer">
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
                                <a href='/cart'><FiShoppingBag size={20} /></a>
                                <div
                                    onClick={() => {
                                        if (token) {
                                            toast.info('You are already logged in.', {
                                                position: 'top-right',
                                                autoClose: 2500,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                theme: 'light',
                                            });
                                        } else {
                                            window.location.href = '/login';
                                        }
                                    }}
                                    className="cursor-pointer"
                                >
                                    <FiUser size={20} />
                                </div>

                                <FiSearch size={20} className="cursor-pointer transition-all duration-500" onClick={handleSearchClick} />
                                <button className="flex items-center space-x-1" onClick={handleMenuToggle}>
                                    <FiMenu size={20} />
                                    <span className="text-md font-semibold font-cormorant">MENU</span>
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>


            {/* Menu Drawer */}
            <MenuDrawer isMenuOpen={isMenuOpen} handleMenuToggle={handleMenuToggle} />
            <ToastContainer />
        </div>
    );
};

export default Navbar;
