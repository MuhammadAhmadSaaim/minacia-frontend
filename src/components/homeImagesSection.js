import React from 'react';
import BgImageCard from './bgImageCard';
import { Navigate, useNavigate } from 'react-router-dom';
const HomeImagesSection = () => {
    const navigate = useNavigate();
    const cards = [
        {
            imageUrl: '/images/frontpage_one.jpg',
            title: 'Women',
            description: 'Explore Women\'s Collection',
        },
        {
            imageUrl: '/images/frontpage_two.jpg',
            title: 'Women',
            description: 'Explore Women\'s Velvet Collection',
        },
        {
            imageUrl: '/images/6.jpg',
            title: 'Men',
            description: 'Fall Winter 2024 - Men\'s Collection',
        },
    ];

    return (
        <div className="max-w-full mx-auto p-5 my-32">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold font-cormorant">New Arrivals</h2>
                <p className="text-gray-500 font-cormorant">Check out our latest products</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Row */}
                <BgImageCard imageUrl={cards[0].imageUrl} title={cards[0].title} description={cards[0].description} />
                <BgImageCard imageUrl={cards[1].imageUrl} title={cards[1].title} description={cards[1].description} />

                {/* Second Row */}
                <div className="col-span-1 sm:col-span-2">
                    <BgImageCard imageUrl={cards[2].imageUrl} title={cards[2].title} description={cards[2].description} />
                </div>
            </div>
        
            <button onClick={() => {navigate("/all-products")}} className="w-full lg:w-auto text-2xl bg-black text-white py-3 px-6 mt-8 mb-6 font-cormorant flex justify-center items-center mx-auto">
                Shop Now
            </button>
        </div>
    );
};

export default HomeImagesSection;
