import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductDetails = () => {
    const [selectedColor, setSelectedColor] = useState("Black");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const products = useSelector(state => state.products.products);
    const product = products.find(p => p.id === parseInt(id));
    const colors = [
        { name: 'Black', code: 'P78174 V70206 NZU95' },
        { name: 'Light Blue', code: 'P78174 V70206 NZU96' },
        { name: 'Gray', code: 'P78174 V70206 NZU97' },
    ];
    // Slider settings for slick-carousel
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    const handleAddToCart = () => {
        dispatch(addToCart({ product, quantity }));
        navigate("/cart")
    };

    return (
        <div>
            <div className="h-20" />
            <div className="flex flex-col lg:flex-row p-4 lg:p-12 justify-center">
                {/* Image Section */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                    <Slider {...settings} className="w-full">
                        {product.images.map((imageObj, index) => (
                            <div key={index} className="flex justify-center items-center">
                                <div className="h-[400px] w-full overflow-hidden flex justify-center items-center"> {/* Fixed height container */}
                                    <img
                                        src={imageObj.image}
                                        alt={`Product Image ${index + 1}`}
                                        className="h-full w-auto object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Details Section */}
                <div className="w-full lg:w-1/2 mt-6 lg:mt-0 flex flex-col justify-center lg:pl-12">
                    {/* Product Name */}
                    <h1 className="text-3xl lg:text-5xl font-bold mb-4 font-cormorant">{product.name}</h1>

                    {/* Color Selection */}
                    <p className="text-base lg:text-lg text-gray-600 mb-2 font-cormorant">{product.description}</p>
                    {/* Price */}
                    <p className="text-xl lg:text-3xl font-semibold mb-6 font-cormorant">${product.price}</p>

                    {/* Contact Button */}
                    <button onClick={handleAddToCart} className="w-full lg:w-auto text-2xl bg-black text-white py-3 px-6 -md mb-6 font-cormorant">
                        Add To Cart
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

            {/* New Section with Background Image */}
            <div
                className="w-full h-96 bg-cover bg-center flex items-center justify-end"
                style={{
                    backgroundImage: `url("/images/bgtemp.jpg")`,
                    marginTop: '50px',
                }}
            >
                <div className="w-full lg:w-4/5 p-10 lg:p-20 text-right text-white" style={{ marginRight: '10%', marginLeft: '10%' }}>
                    <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-cormorant">Minacia</h2>
                    <p className="text-base lg:text-lg text-white mb-6 font-cormorant">
                        A range of services to preserve each MINACIA creation.
                    </p>
                </div>
            </div>
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
