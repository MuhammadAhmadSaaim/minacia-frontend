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

                            At Minacia, we don’t follow trends, we disrupt them. Wear the Minacia, own the moment and embrace the menace in fashion.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2 text-sm">
                        <p className="text-2xl font-bold tracking-wide text-white font-cormorant">Contacts</p>
                        <div className="flex">
                            <p className="mr-1 text-white">Email:</p>
                            <a href="mailto:info@minaciasociety.com" aria-label="Our email" title="Our email" className="text-white">info@minaciasociety.com</a>
                        </div>

                    </div>
                    <div>
                        <span className="text-2xl font-bold tracking-wide text-white font-cormorant">Social</span>
                        <div className="flex items-center mt-1 space-x-3">
                            <a href="https://www.tiktok.com/@minaciasociety" target="blank" className="text-blue-500">
                                <svg
                                fill="currentColor" className="h-6"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333335 333336" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd">
                                    <path d="M72464 0h188407c39856 0 72464 32609 72464 72465v188407c0 39855-32608 72464-72464 72464H72464C32608 333336 0 300727 0 260872V72465C0 32609 32608 0 72464 0zm127664 70642c337 2877 825 5661 1461 8341l6304 2c1170 9991 4006 19119 8465 26697 7282 6745 16797 10904 28280 11641v9208c2131 444 4350 746 6659 894v29690c-14847 1462-27841-3426-42981-12531l2324 50847c0 16398 61 23892-8738 38977-20546 35222-58194 36677-82176 18323-12269-4256-23069-12466-29881-23612-19875-32516-1959-85512 55687-90966l-94 7835v1970c3105-646 6365-1144 9794-1468v31311c-12484 2057-20412 5890-24119 12980-7424 14197-4049 26526 3716 34309 16276 2796 34401-8481 31673-43351V70644h33628z" fill="#1a121f" /><path d="M200128 70642c3093 26406 18915 45038 44510 46681v25046l-165 15v-21275c-25595-1642-40311-17390-43404-43796l-27114-1v111095c3912 50005-35050 51490-49955 32531 17482 10934 45867 3826 42501-39202V70641h33628zm-72854 184165c-15319-3153-29249-12306-37430-25689-19875-32516-1959-85512 55687-90966l-94 7835c-53444 8512-58809 65920-44009 89802 5707 9209 15076 15686 25846 19019z" fill="#26f4ee" />
                                    <path d="M207892 78985c1761 15036 7293 28119 16454 36903-12866-6655-20630-19315-23062-36905l6609 2zm36580 47511c2181 463 4456 777 6824 929v29690c-14847 1462-27841-3426-42981-12531l2324 50847c0 16398 61 23892-8738 38977-21443 36760-61517 36743-85239 15810 30930 17765 84928 3857 84829-56453v-55496c15141 9105 28134 13993 42981 12530v-24302zm-99036 21460c3105-646 6365-1144 9794-1468v31311c-12484 2057-20412 5890-24119 12980-10441 19964 474 36238 14923 41365-18075-649-36010-19214-23555-43031 3707-7089 10474-10923 22958-12980v-28177z" fill="#fb2c53" /><path d="M201068 77313c3093 26406 17809 42154 43404 43796v29689c-14847 1462-27841-3425-42981-12530v55496c119 72433-77802 77945-100063 42025-14800-23881-9435-81290 44009-89802v30147c-12483 2057-19250 5891-22958 12980-22909 43808 56997 69872 51475-706V77313l27114 1z" fill="#fefefe" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/minaciasociety/" target="blank" className="text-pink-500 transition-colors duration-300 hover:text-deep-purple-accent-400">
                                <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                                    <circle cx="15" cy="15" r="4"></circle>
                                    <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10 C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1 c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z"></path>
                                </svg>
                            </a>
                        </div>
                        <p className="mt-4 text-sm">
                            Follow Minacia.
                        </p>

                    </div>
                </div>
                <div className="flex flex-col-reverse justify-between pb-10 lg:flex-row">
                    <p className="text-sm text-white">
                        © Copyright  2025 Minacia Ltd. All rights reserved.
                    </p>
                    <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                        <li>
                            <Link to="/Faqs" className="text-sm text-white hover:text-deep-purple-accent-400">F.A.Q</Link>
                        </li>
                        <li>
                            <Link to="/privacypolicy" className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400">Privacy Policy</Link>
                        </li>

                        <li>
                            <a href="/termsandconditions" className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400">Terms &amp; Conditions</a>
                        </li>
                        <li>
                            <a href="/returnpolicy" className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400">Return Policy</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <button
                        id="to-top-button"
                        onClick={goToTop}
                        title="Go To Top"
                        className={`fixed bottom-10 right-10 p-4 border-0 w-14 h-14 rounded-full shadow-md group bg-gradient-to-br from-gray-700 to-black ${showButton ? 'visible' : 'invisible'} hover:bg-gradient-to-br hover:from-white-400 hover:to-black-400 text-white text-lg font-semibold transition-colors duration-300`}
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
