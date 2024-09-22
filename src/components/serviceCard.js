import React from 'react';

const ServiceCard = ({ title, description }) => {
    return (
        <div className="w-72 rounded-lg overflow-hidden bg-white p-4" >
            {/* Placeholder for image */}
            <div className="bg-black h-44 rounded"></div>
            <div className="mt-2">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-gray-600 mt-2">{description}</p>
                <button className="mt-4 text-gray-500 underline">
                    Discover
                </button>
            </div>
        </div>
    );
};

export default ServiceCard;
