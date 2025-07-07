import React, { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MenuDrawer = ({ isMenuOpen, handleMenuToggle }) => {
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`http://35.178.29.251:8000/api/listing/categories`)
            .then(res => setCategories(res.data))
            .catch(err => console.error('Error fetching categories:', err));
    }, []);

    return (
        <div className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className={`fixed top-0 right-0 h-full bg-white z-50 shadow-lg transition-transform duration-500 ease-in-out transform 
                ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} 
                w-1/2 md:w-2/5 lg:w-1/3`}>
                <button onClick={handleMenuToggle} className="p-4 text-right">
                    <IoCloseOutline size={24} />
                </button>
                <nav className="p-6 space-y-6">
                    <li className="list-none">
                        <span className="text-lg font-semibold">Categories</span>
                        <ul className="ml-4 space-y-2 mt-2">
                            {categories.map(category => (
                                <li key={category.id}>
                                    <Link to={`productListing/${category.id}`} className="text-lg font-semibold" onClick={handleMenuToggle}>
                                        - {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <hr className="my-4" />
                    <li className="list-none">
                        <Link to="/all-products" className="text-lg font-semibold" onClick={handleMenuToggle}>
                            All Products
                        </Link>
                    </li>
                    <hr className="my-4" />
                    <li className="list-none">
                        <Link to="/contact-us" className="text-lg font-semibold" onClick={handleMenuToggle}>
                            Contact Us
                        </Link>
                    </li>
                </nav>
            </div>
        </div>
    );
};

export default MenuDrawer;
