import React, { useState } from 'react';

const ListingCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
    style={{ width: '280px', height: '450px' }} 
      className="relative bg-white shadow-sm overflow-hidden group mt-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-3/4">
        <img
          src={isHovered ? product.imageHover : product.image}
          alt="product"
          className="w-full h-full object-cover transition-all duration-600 ease-in-out"
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-500">{product.price}</p>
      </div>

      <button
        className={`absolute bottom-0 left-0 w-full bg-black text-white py-2 text-center transition-transform duration-500 ease-in-out ${
          isHovered ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ListingCard;