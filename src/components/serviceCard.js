import React from 'react';

const ServiceCard = ({ title, description, imageUrl }) => {
    return (
        <div className="w-full sm:w-full md:w-full lg:w-full overflow-hidden bg-white sm:p-0 md:p-2 m-5 flex flex-col justify-center transition-transform duration-300 hover:scale-105">
            {/* Image */}
            <img src={imageUrl} alt={title} className="h-60 w-full object-cover" />
            <div className="mt-2">
                <h3 className="text-lg font-semibold font-cormorant">{title}</h3>
                <p className="text-gray-600 mt-2 font-cormorant">{description}</p>
                <button className="mt-4 text-gray-500 underline font-cormorant">
                    Discover
                </button>
            </div>
        </div>
    );
};

export default ServiceCard;
