import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const product = products.find((p) => p.id === parseInt(id));

  const [selectedColor, setSelectedColor] = useState(
    product?.color_variants?.length > 0 ? product.color_variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!selectedColor && product?.color_variants?.length > 0) {
      setSelectedColor(product.color_variants[0]);
    }
  }, [product]);

  const imageCount = selectedColor?.images?.length || 0;

  const settings = {
    dots: imageCount > 1,
    infinite: imageCount > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: imageCount > 1,
  };

  const handleAddToCart = () => {
    if (selectedColor?.quantity === 0) return;

    dispatch(addToCart({ product, quantity, selectedColor }));
    navigate('/cart');
  };

  if (!product || !selectedColor) return <div>Loading...</div>;

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

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-cormorant text-lg mb-2">Available Colors:</h3>
            <div className="flex flex-wrap gap-4">
              {product.color_variants.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`border-2 rounded-lg p-1 ${
                    selectedColor?.id === color.id ? 'border-black' : 'border-gray-300'
                  }`}
                  disabled={color.quantity === 0}
                >
                  <img
                    src={color.images[0]?.image}
                    alt={color.color_name}
                    className="h-16 w-16 object-cover rounded"
                  />
                  <p className="text-sm font-cormorant text-center mt-1">{color.color_name}</p>
                  {color.quantity === 0 && (
                    <p className="text-xs text-red-500 font-cormorant">Out of Stock</p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={selectedColor.quantity === 0}
            className={`w-full lg:w-auto text-2xl py-3 px-6 mb-6 font-cormorant ${
              selectedColor.quantity === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white'
            }`}
          >
            {selectedColor.quantity === 0 ? 'Out of Stock' : 'Add To Cart'}
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

      {/* Background Banner Section */}
      <div
        className="w-full h-96 bg-cover bg-center flex items-center justify-end"
        style={{ backgroundImage: `url("/images/banner.jpg")`, marginTop: '50px' }}
      >
        <div className="w-full lg:w-4/5 p-10 lg:p-20 text-right text-white" style={{ marginRight: '10%', marginLeft: '10%' }}>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-cormorant">Minacia</h2>
          <p className="text-base lg:text-lg text-white mb-6 font-cormorant">
            A range of services to preserve each MINACIA creation.
          </p>
        </div>
      </div>

      {/* Product Details */}
      {product.details && product.details.length > 0 && (
        <div className="mt-16 p-6 lg:p-12">
          <h3 className="text-2xl lg:text-4xl font-bold mb-6 font-cormorant">Product Details</h3>
          <ul className="list-disc list-inside space-y-4 text-gray-600 font-cormorant">
            {product.details.map((item, index) => (
              <li key={index} className="text-base lg:text-lg">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
