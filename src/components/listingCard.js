import React, { useState } from 'react';

const ListingCard = ({ name, price, image, imageHover, category }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-white overflow-hidden group mt-12 flex flex-col w-full max-w-xs mx-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-0 pb-[133.33%]"> {/* Aspect Ratio 3:4 */}
        <img
          src={isHovered ? imageHover : image}
          alt="product"
          className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-600 ease-in-out"
        />
      </div>

      <div className="px-2 mb-12"> {/* Adjusted margin-bottom to create space for the button */}
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-500">{price}</p>
        <p className="text-gray-400 text-sm">{category}</p>
      </div>

      <button
        className={`absolute bottom-0 left-0 w-full bg-black text-white py-2 text-center transition-transform duration-500 ease-in-out ${isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ListingCard;
