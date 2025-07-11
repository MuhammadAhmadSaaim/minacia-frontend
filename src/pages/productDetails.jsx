import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const products = useSelector((state) => state.products.products);
  const cartItems = useSelector((state) => state.cart.items);
  const product = products.find((p) => p.id === parseInt(id));

  const [selectedColorId, setSelectedColorId] = useState(null);
  const [validatedStock, setValidatedStock] = useState({});
  const [quantity, setQuantity] = useState(1);

  const selectedColor = product?.color_variants?.find(v => v.id === selectedColorId);

  useEffect(() => {
    if (!product) return;

    const fetchStock = async () => {
      try {
        const payload = {
          items: product.color_variants.map(v => ({
            productId: product.id,
            selectedColorId: v.id
          }))
        };

        const res = await axios.post(`/api/listing/cartvalidate/`, payload);
        const updatedStock = {};
        res.data.forEach(item => {
          updatedStock[item.selectedColorId] = item.currentStock;
        });

        setValidatedStock(updatedStock);

        const firstAvailable = product.color_variants.find(v => {
          const qtyInCart = cartItems.find(
            item => item.id === product.id && item.selectedColor?.id === v.id
          )?.quantity || 0;
          return updatedStock[v.id] - qtyInCart > 0;
        }) || product.color_variants[0];

        setSelectedColorId(firstAvailable?.id);
      } catch (err) {
        console.error("Error fetching stock:", err);
      }
    };

    fetchStock();
  }, [product, BASE_URL, cartItems]);

  const handleAddToCart = () => {
    const qtyInCart = cartItems.find(
      item => item.id === product.id && item.selectedColor?.id === selectedColor.id
    )?.quantity || 0;

    const remaining = (validatedStock[selectedColor.id] || 0) - qtyInCart;
    if (!selectedColor || remaining <= 0) return;

    const colorWithStock = {
      ...selectedColor,
      quantity: remaining
    };

    dispatch(addToCart({ product, quantity, selectedColor: colorWithStock }));
    navigate('/cart');
  };

  if (!product || !selectedColor) return <div>Loading...</div>;

  const imageCount = selectedColor?.images?.length || 0;

  const settings = {
    dots: imageCount > 1,
    infinite: imageCount > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: imageCount > 1,
  };

  const qtyInCart = cartItems.find(
    item => item.id === product.id && item.selectedColor?.id === selectedColor.id
  )?.quantity || 0;
  const remainingStock = (validatedStock[selectedColor.id] || 0) - qtyInCart;
  const isOutOfStock = remainingStock <= 0;

  return (
    <div>
      <div className="h-20" />
      <div className="flex flex-col lg:flex-row p-4 lg:p-12 justify-center">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
          {imageCount > 1 ? (
            <Slider {...settings} className="w-full">
              {selectedColor.images.map((imageObj, index) => (
                <div key={index} className="flex justify-center items-center">
                  <div className="h-[400px] w-full overflow-hidden flex justify-center items-center">
                    <img
                      src={imageObj.image}
                      alt={`Color Image ${index + 1}`}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="h-[400px] w-full overflow-hidden flex justify-center items-center">
              <img
                src={selectedColor.images[0]?.image}
                alt={selectedColor.color_name}
                className="h-full w-auto object-contain"
              />
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0 flex flex-col justify-center lg:pl-12">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4 font-cormorant">{product.name}</h1>
          <p className="text-base lg:text-lg text-gray-600 mb-2 font-cormorant">{product.description}</p>
          <p className="text-xl lg:text-3xl font-semibold mb-6 font-cormorant">£{product.price}</p>

          {/* Color Selection (Always Enabled) */}
          <div className="mb-6">
            <h3 className="font-cormorant text-lg mb-2">Available Colors:</h3>
            <div className="flex flex-wrap gap-4">
              {product.color_variants.map((color) => {
                const backendStock = validatedStock[color.id] || 0;
                const qtyInCart = cartItems.find(
                  item => item.id === product.id && item.selectedColor?.id === color.id
                )?.quantity || 0;
                const remaining = backendStock - qtyInCart;
                const isOutOfStock = remaining <= 0;

                return (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColorId(color.id)}
                    className={`border-2 rounded-lg p-1 ${
                      selectedColorId === color.id ? 'border-black' : 'border-gray-300'
                    }`}
                  >
                    <img
                      src={color.images[0]?.image}
                      alt={color.color_name}
                      className="h-16 w-16 object-cover rounded"
                    />
                    <p className="text-sm font-cormorant text-center mt-1">{color.color_name}</p>
                    {isOutOfStock && (
                      <p className="text-xs text-red-500 font-cormorant">Out of Stock</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full lg:w-auto text-2xl py-3 px-6 mb-6 font-cormorant ${
              isOutOfStock ? 'bg-gray-400 cursor-not-allowed text-gray-200' : 'bg-black text-white'
            }`}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add To Cart'}
          </button>

          {/* Additional Info */}
          <p className="text-sm text-gray-500 mb-4 font-cormorant">
            DISCOVER MORE CREATIONS IN BOUTIQUES
          </p>
          <p className="text-sm text-gray-500 font-cormorant">
            *Suggested retail price. <a href="#" className="underline">More information</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
