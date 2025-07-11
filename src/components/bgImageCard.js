import React from 'react';

const BgImageCard = ({ imageUrl, title, description }) => {
    return (
        <div
            className="h-[550px] w-full bg-cover bg-center my-2"
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
           
        </div>
    );
};

export default BgImageCard;
