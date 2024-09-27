import React from 'react';

const BgImageCard = ({ imageUrl, title, description }) => {
    return (
        <div
            className="h-96 w-full bg-cover bg-center my-2"
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p className="text-sm mt-2">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default BgImageCard;
