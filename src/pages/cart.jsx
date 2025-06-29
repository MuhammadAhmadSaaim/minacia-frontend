import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../redux/cartSlice';

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    const [shipping, setShipping] = useState(0);
    const [taxRate, setTaxRate] = useState(0);

    // Fetch dynamic shipping and tax values
    useEffect(() => {
        fetch(`${BASE_URL}/api/listing/additionalPays/`)
            .then(res => res.json())
            .then(data => {
                setShipping(parseFloat(data.shipping));
                setTaxRate(parseFloat(data.tax));
                console.log('Shipping:', data.shipping, 'Tax Rate:', data.tax);
            })
            .catch(err => {
                console.error('Error fetching tax/shipping:', err);
            });
    }, []);

    const handleRemove = (id) => {
        dispatch(removeFromCart({ productId: id }));
    };

    const handleCheckout = () => {
        navigate("/billing", { state: { price: totalPrice, totalItems: cartItems.length } });
    };

    const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price.replace('Rs', '')) * item.quantity, 0);
    const taxes = subtotal * (taxRate / 100); 
    const totalPrice = subtotal + taxes + shipping;
    return (
        <div className="cart-content mt-20">
            <div className="md:hidden shopping-bag w-full min-w-full">
                <section className="usr-products">
                    <div className="products-wrapper w-full">
                        <ul className="product-list m-0 p-0 list-none">
                            {cartItems.map((item) => (
                                <li key={item.id} className="item-summary px-6 pb-12 border-b">
                                    <div className="item w-full mt-12 m-auto">
                                        <div className="bg-black m-auto w-60 h-60">
                                            <img src={item.images[1].image} alt={item.title} className="w-full h-full object-cover" /> {/* Adjust this line to your image structure */}
                                        </div>
                                    </div>
                                    <div className="text-center my-4 item w-full tracking-wide">
                                        <div className="font-semibold">
                                            {item.name}
                                        </div>
                                        <div className="font-light">
                                            Color: {item.color}
                                        </div>
                                        <div className="font-light">
                                            Size: {item.size}
                                        </div>
                                        <div className="my-4 text-xl tracking-wider">
                                            Rs {item.price}
                                        </div>
                                    </div>
                                    <div className="qty flex">
                                        <select
                                            value={item.quantity}
                                            onChange={(e) => {
                                                const quantity = parseInt(e.target.value);
                                                dispatch(updateQuantity({ productId: item.id, quantity }));
                                            }}
                                            className="border py-2 px-4 text-center"
                                        >
                                            {[...Array(10)].map((_, i) => (
                                                <option key={i} value={i + 1}>QTY: {i + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="py-4 mt-2 text-sm font-semibold item-footer flex space-x-4 justify-center">
                                       
                                        <button onClick={() => handleRemove(item.id)} className="border-b">
                                            DELETE
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="order-summary w-full">
                            <div className="border-b osum-wrap p-8 font-cormorant">
                                <div className="order-header border-b">
                                    <div className="mb-2 text-sm font-semibold uppercase font-cormorant">
                                        order summary
                                    </div>
                                    <div className="mb-4 text-xs uppercase">
                                        {`Cart ID: ${Math.random().toString(36).substring(2, 15)}`} {/* Unique Cart ID for display */}
                                    </div>
                                </div>
                                <div className="order-details my-4 font-cormorant">
                                    <div className="text-sm mb-4 font-semibold flex justify-between font-cormorant">
                                        <span>Subtotal</span>
                                        <span>Rs {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="text-sm mb-4 font-semibold flex justify-between font-cormorant">
                                        <span>Shipping</span>
                                        <span className="text-gray-400">Rs {shipping}</span>
                                    </div>
                                    <div className="text-sm mb-4 font-semibold flex justify-between font-cormorant">
                                        <span>Estimated Tax</span>
                                        <span>Rs {taxes.toFixed(2)}</span>
                                    </div>
                                    <div className="text-sm pb-4 border-b font-semibold flex justify-between font-cormorant">
                                        <span>Estimated Total</span>
                                        <span className="text-lg">Rs {totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="w-4/5 mt-6 m-auto">
                                        <button onClick={handleCheckout} className="bg-black text-white py-4 px-6 w-full tracking-widest text-xs font-semibold">
                                            CHECKOUT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="hidden md:block gutter w-full p-4">
                <div className="wrapper p-8">
                    <div className="maincontent flex gap-8">
                        <div className="left flex-1">
                            <div className="flex py-4 border-b uppercase justify-between w-full list-header">
                                <div className="font-semibold">
                                    your selections
                                </div>
                            </div>
                            <div className="mt-8 items">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="product w-full flex items-center border-b-2">
                                        <div className="prodimg max-w-28">
                                            <img src={item.images[1].image} alt={item.title} className="w-full" />
                                        </div>
                                        <div className="flex flex-col p-4 flex-1">
                                            <div className="prod-info flex items-center justify-between">
                                                <div className="title text-md w-1/2">
                                                    {item.name}
                                                </div>
                                                <div className="flex-col text-end">
                                                    <div className="qty flex">
                                                        <select
                                                            value={item.quantity}
                                                            onChange={(e) => {
                                                                const quantity = parseInt(e.target.value);
                                                                dispatch(updateQuantity({ productId: item.id, quantity }));
                                                            }}
                                                            className="border py-1 px-2 text-center"
                                                        >
                                                            {[...Array(10)].map((_, i) => (
                                                                <option key={i} value={i + 1}>QTY: {i + 1}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="amount tracking-widest text-gray-600">
                                                        Rs {item.price}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ship-info">
                                                <div className="uppercase font-semibold">
                                                    Available
                                                </div>
                                                <div className="text-sm">
                                                    Enjoy your complementary delivery
                                                </div>
                                            </div>
                                            <div className="py-4 mt-2 text-sm font-semibold item-footer space-x-4">
                                                
                                                <button onClick={() => handleRemove(item.id)} className="border-b">
                                                    DELETE
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="right flex-1 min-w-80 max-w-96">
                            <div className="order-summary flex-col p-6 border">
                                <div className="header pt-10 pb-6 border-b-2">
                                    <div className="font-semibold uppercase">
                                        order summary
                                    </div>
                                    <div className="text-sm uppercase">
                                        {`Cart ID: ${Math.random().toString(36).substring(2, 15)}`} {/* Unique Cart ID for display */}

                                    </div>
                                </div>
                                <div className="summary py-6 flex-col font-cormorant">
                                    <div className="text-sm mb-4 font-semibold flex justify-between font-cormorant">
                                        <span>Subtotal</span>
                                        <span>Rs {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="text-sm mb-4 font-semibold flex justify-between font-cormorant">
                                        <span>Shipping</span>
                                        <span className="text-gray-400">Rs {shipping}</span>
                                    </div>
                                    <div className="text-sm mb-4 font-semibold flex justify-between font-cormorant">
                                        <span>Estimated Tax</span>
                                        <span>Rs {taxes.toFixed(2)}</span>
                                    </div>
                                    <div className="text-sm pb-4 border-b font-semibold flex justify-between font-cormorant">
                                        <span>Estimated Total</span>
                                        <span className="text-lg">Rs {totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="w-full mt-6">
                                    <button onClick={handleCheckout} className="bg-black text-white py-4 px-6 w-full tracking-widest text-xs font-semibold">
                                        CHECKOUT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
