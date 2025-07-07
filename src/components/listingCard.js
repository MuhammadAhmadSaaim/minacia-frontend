import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';


const ListingCard = ({ id, name, price, image, imageHover, category, selectedColor }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const cartItems = useSelector(state => state.cart.items);

  const alreadyInCart = cartItems.find(
    item => item.id === id && item.selectedColor?.id === selectedColor?.id
  );
  const qtyInCart = alreadyInCart?.quantity || 0;

  // Remaining quantity available to add
  const remainingStock = selectedColor?.quantity - qtyInCart;

  // Disable if no remaining quantity
  const isOutOfStock = remainingStock <= 0;


  const handleAddToCart = (event) => {
    event.stopPropagation();

    if (isOutOfStock) return; // Don't proceed

    const product = {
      id,
      name,
      price,
      category,
      color_variants: [selectedColor]
    };
    dispatch(addToCart({ product, quantity: 1, selectedColor }));
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
          <p className="text-gray-500">£{price}</p>
          <p className="text-gray-400 text-sm">{category}</p>
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={`absolute bottom-0 left-0 w-full py-2 text-center transition-transform duration-500 ease-in-out
    ${isHovered ? 'translate-y-0' : 'translate-y-full'}
    ${isOutOfStock ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-black text-white'}
  `}
      >
        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
      </button>

    </div>
  );
};

export default ListingCard;
