import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';


const ListingCard = ({ id, name, price, image, imageHover, category }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = (event) => {
    event.stopPropagation();
    const product = products.find(p => p.id === parseInt(id));
    if (product) {
      dispatch(addToCart({ product, quantity: 1 }));
    }
  };
  
  return (
    <div
      className="relative bg-white overflow-hidden group flex flex-col w-full max-w-xs mx-2 mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product-details/${id}`}>
        <div className="relative w-full h-0 pb-[133.33%]"> {/* Aspect Ratio 3:4 */}
          <img
            src={isHovered ? imageHover : image}
            alt="product"
            className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-600 ease-in-out"
          />
        </div>

        <div className="px-2 mb-12"> {/* Adjusted margin-bottom to create space for the button */}
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-gray-500">{price}£</p>
          <p className="text-gray-400 text-sm">{category}</p>
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        className={`absolute bottom-0 left-0 w-full bg-black text-white py-2 text-center transition-transform duration-500 ease-in-out ${isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}

      >
        Add to Cart
      </button>
    </div>
  );
};

export default ListingCard;
