import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Footer() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="bg-[#181818] text-white">
            <div className="px-6 pt-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-14 lg:px-14">
                <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="sm:col-span-2">
                        <h3 className="text-4xl font-bold tracking-wide uppercase font-cormorant text-white">Minacia</h3>
                        <div className="mt-3 lg:max-w-sm">
                            <p className="text-sm">
                                Luxeon Clothing redefines fashion by merging timeless elegance with modern sophistication. Our collections blend classic craftsmanship with cutting-edge design, offering a unique style that stands out. Experience the future of fashion with Luxeon, where luxury meets innovation.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2 text-sm">
                        <p className="text-2xl font-bold tracking-wide text-white font-cormorant">Contacts</p>
                        <div className="flex">
                            <p className="mr-1 text-white">Phone:</p>
                            <a href="tel:850-123-5021" aria-label="Our phone" title="Our phone" className="text-white">042-9845656</a>
                        </div>
                        <div className="flex">
                            <p className="mr-1 text-white">Email:</p>
                            <a href="mailto:Farmtech@lorem.mail" aria-label="Our email" title="Our email" className="text-white">Minacia@gmail.com</a>
                        </div>
                        <div className="flex">
                            <p className="mr-1 text-white">Address:</p>
                            <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" aria-label="Our address" title="Our address" className="text-white">
                                312 Lovely Street, NY
                            </a>
                        </div>
                    </div>
                    <div>
                        <span className="text-2xl font-bold tracking-wide text-white font-cormorant">Social</span>
                        <div className="flex items-center mt-1 space-x-3">
                            <a href="https://www.facebook.com/share/7owhkYk1Q7xSsZuS/?mibextid=qi2Omg" target="blank" className="text-blue-500">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                                    <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z"></path>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/gehna_by_mena?igsh=NmZ5emt5OWxoMTVs" target="blank" className="text-pink-500 transition-colors duration-300 hover:text-deep-purple-accent-400">
                                <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                                    <circle cx="15" cy="15" r="4"></circle>
                                    <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10 C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1 c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z"></path>
                                </svg>
                            </a>
                        </div>
                        <p className="mt-4 text-sm">
                            Enjoy the ease of premium clothing delivered right to your door, combining elegance with modern trends. Elevate your wardrobe seamlessly and make a statement with Luxeon.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col-reverse justify-between pb-10 lg:flex-row">
                    <p className="text-sm text-white">
                        © Copyright 2020 Minacia Inc. All rights reserved.
                    </p>
                    <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                        <li>
                            <Link to="/Faqs" className="text-sm text-white hover:text-deep-purple-accent-400">F.A.Q</Link>
                        </li>
                        <li>
                            <Link to="/privacypolicy" className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400">Privacy Policy</Link>
                        </li>
                        <li>
                            <a href="/" className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400">Terms &amp; Conditions</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <button
                        id="to-top-button"
                        onClick={goToTop}
                        title="Go To Top"
                        className={`fixed bottom-10 right-10 p-4 border-0 w-14 h-14 rounded-full shadow-md group bg-gradient-to-br from-gray-700 to-black ${showButton ? 'visible' : 'invisible'} hover:bg-gradient-to-br hover:from-purple-400 hover:to-pink-400 text-white text-lg font-semibold transition-colors duration-300`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M12 4l8 8h-6v8h-4v-8H4l8-8z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Footer;
