import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const MenuDrawer = ({ isMenuOpen, handleMenuToggle }) => {
    return (
        <div className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className={`fixed top-0 right-0 h-full bg-white z-50 shadow-lg transition-transform duration-500 ease-in-out transform 
                ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} 
                w-1/2 md:w-2/5 lg:w-1/3`}>
                <button onClick={handleMenuToggle} className="p-4 text-right">
                    <IoCloseOutline size={24} />
                </button>
                <nav className="p-6 space-y-6">
                    <li className="list-none"><a href="#" className="text-lg font-semibold">New Arrivals</a></li>
                    <hr className="my-4" />
                    <li className="list-none"><a href="#" className="text-lg font-semibold">Categories</a>
                        <ul className="ml-4 space-y-2">
                            <li className="mt-1"><a href="#" className="text-lg font-semibold">- Sun Glasses</a></li>
                            <li><a href="/product-listings" className="text-lg font-semibold">- Hats</a></li>
                            <li><a href="#" className="text-lg font-semibold">- Caps</a></li>
                        </ul>
                    </li>
                    <hr className="my-4" />
                    <li className="list-none"><a href="/all-products" className="text-lg font-semibold">All Products</a></li>
                    <hr className="my-4" />
                    <li className="list-none"><a href="/contact-us" className="text-lg font-semibold">Contact Us</a></li>
                </nav>
            </div>
        </div>
    );
};

export default MenuDrawer;
