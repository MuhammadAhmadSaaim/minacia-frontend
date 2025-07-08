import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart, syncCartQuantities } from '../redux/cartSlice';

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    const [quantityErrors, setQuantityErrors] = useState({});
    const [taxRate, setTaxRate] = useState(0); // Default tax

    useEffect(() => {
        fetch(`${BASE_URL}/api/listing/additionalPays/`)
            .then(res => res.json())
            .then(data => {
                if (data.tax !== null && data.tax !== undefined) {
                    setTaxRate(parseFloat(data.tax));
                }
                
            })
            .catch(err => {
                console.error("Error fetching tax:", err);
            });
    }, [BASE_URL]);
    useEffect(() => {
        dispatch(syncCartQuantities());
    }, [dispatch]);

    useEffect(() => {
        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        };
    }, []);
    
    const handleRemove = (id, colorId) => {
        dispatch(removeFromCart({ productId: id, selectedColorId: colorId }));
    };

    const handleCheckout = async () => {
        await dispatch(syncCartQuantities());  
        navigate("/billing");
    };

    const subtotal = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('Rs', '').replace('£', '').trim());
        return sum + price * item.quantity;
    }, 0);
    
    const taxes = subtotal * (taxRate / 100);
    const totalPrice = subtotal + taxes;

    const getItemImage = (item) => {
        const imagePath = item.selectedColor?.images?.[0]?.image || item.images?.[0]?.image;
        return imagePath?.startsWith("http") ? imagePath : `${BASE_URL}${imagePath}`;
    };

    const handleQuantityChange = (item, newQty) => {
        const key = `${item.id}-${item.selectedColor?.id}`;
        const maxQty = item.selectedColor?.quantity || 1;

        if (newQty <= maxQty) {
            dispatch(updateQuantity({
                productId: item.id,
                selectedColorId: item.selectedColor?.id,
                quantity: newQty,
            }));
            setQuantityErrors(prev => ({ ...prev, [key]: '' }));
        } else {
            setQuantityErrors(prev => ({
                ...prev,
                [key]: `Only ${maxQty} in stock`,
            }));
        }
    };

    return (
        <div className="cart-content mt-20">
            {/* Mobile View */}
            <div className="md:hidden shopping-bag w-full min-w-full">
                <section className="usr-products">
                    <div className="products-wrapper w-full">
                        <ul className="product-list m-0 p-0 list-none">
                            {cartItems.map((item) => {
                                const key = `${item.id}-${item.selectedColor?.id}`;
                                const maxQty = item.selectedColor?.quantity || 1;
                                return (
                                    <li key={key} className="item-summary px-6 pb-12 border-b">
                                        <div className="item w-full mt-12 m-auto">
                                            <div className="bg-black m-auto w-60 h-60">
                                                <img src={getItemImage(item)} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                        <div className="text-center my-4 item w-full tracking-wide">
                                            <div className="font-semibold">{item.name}</div>
                                            <div className="font-light">Color: {item.selectedColor?.color_name || item.color}</div>
                                            {item.size && <div className="font-light">Size: {item.size}</div>}
                                            <div className="my-4 text-xl tracking-wider">£ {item.price}</div>
                                        </div>
                                        <div className="qty flex flex-col items-center">
                                            <select
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                                                className="border py-2 px-4 text-center"
                                            >
                                                {[...Array(10)].map((_, i) => {
                                                    const value = i + 1;
                                                    return (
                                                        <option key={value} value={value} disabled={value > maxQty}>
                                                            QTY: {value}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            {quantityErrors[key] && (
                                                <div className="text-red-500 text-xs mt-1">{quantityErrors[key]}</div>
                                            )}
                                           
                                        </div>
                                        <div className="py-4 mt-2 text-sm font-semibold item-footer flex space-x-4 justify-center">
                                            <button onClick={() => handleRemove(item.id, item.selectedColor?.id)} className="border-b">
                                                DELETE
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="order-summary w-full">
                            <div className="border-b osum-wrap p-8 font-cormorant">
                                <div className="order-header border-b">
                                    <div className="mb-2 text-sm font-semibold uppercase font-cormorant">order summary</div>
                                    <div className="mb-4 text-xs uppercase">
                                        Cart ID: {Math.random().toString(36).substring(2, 15)}
                                    </div>
                                </div>
                                <div className="order-details my-4 font-cormorant">
                                    <div className="text-sm mb-4 font-semibold flex justify-between font-cormorant">
                                        <span>Subtotal</span>
                                        <span>£ {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="text-sm mb-4 font-semibold flex justify-between font-cormorant">
                                        <span>Estimated Tax</span>
                                        <span>£ {taxes.toFixed(2)}</span>
                                    </div>
                                    <div className="text-sm pb-4 border-b font-semibold flex justify-between font-cormorant">
                                        <span>Estimated Total</span>
                                        <span className="text-lg">£ {totalPrice.toFixed(2)}</span>
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

            {/* Web View */}
            <div className="hidden md:block gutter w-full p-4">
                <div className="wrapper p-8">
                    <div className="maincontent flex gap-8">
                        <div className="left flex-1">
                            <div className="flex py-4 border-b uppercase justify-between w-full list-header">
                                <div className="font-semibold">your selections</div>
                            </div>
                            <div className="mt-8 items">
                                {cartItems.map((item) => {
                                    const key = `${item.id}-${item.selectedColor?.id}`;
                                    const maxQty = item.selectedColor?.quantity || 1;
                                    return (
                                        <div key={key} className="product w-full flex items-center border-b-2">
                                            <div className="prodimg max-w-28">
                                                <img src={getItemImage(item)} alt={item.name} className="w-full" />
                                            </div>
                                            <div className="flex flex-col p-4 flex-1">
                                                <div className="prod-info flex items-center justify-between">
                                                    <div className="title text-md w-1/2">{item.name}</div>
                                                    <div className="flex-col text-end">
                                                        <div className="qty flex flex-col items-end">
                                                            <select
                                                                value={item.quantity}
                                                                onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                                                                className="border py-1 px-2 text-center"
                                                            >
                                                                {[...Array(10)].map((_, i) => {
                                                                    const value = i + 1;
                                                                    return (
                                                                        <option key={value} value={value} disabled={value > maxQty}>
                                                                            QTY: {value}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </select>
                                                            {quantityErrors[key] && (
                                                                <div className="text-red-500 text-xs mt-1">{quantityErrors[key]}</div>
                                                            )}
                                                        </div>
                                                        <div className="amount tracking-widest text-gray-600">£ {item.price}</div>
                                                    </div>
                                                </div>
                                                <div className="ship-info">
                                                    <div className="uppercase font-semibold">Available</div>
                                                    <div className="text-sm">Enjoy your complementary delivery</div>
                                                </div>
                                                <div className="py-4 mt-2 text-sm font-semibold item-footer space-x-4">
                                                    <button onClick={() => handleRemove(item.id, item.selectedColor?.id)} className="border-b">
                                                        DELETE
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="right flex-1 min-w-80 max-w-96">
                            <div className="order-summary flex-col p-6 border">
                                <div className="header pt-10 pb-6 border-b-2">
                                    <div className="font-semibold uppercase">order summary</div>
                                    <div className="text-sm uppercase">
                                        Cart ID: {Math.random().toString(36).substring(2, 15)}
                                    </div>
                                </div>
                                <div className="summary py-6 flex-col font-cormorant">
                                    <div className="text-sm mb-4 font-semibold flex justify-between font-cormorant">
                                        <span>Subtotal</span>
                                        <span>£ {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="text-sm mb-4 font-semibold flex justify-between font-cormorant">
                                        <span>Estimated Tax</span>
                                        <span>£ {taxes.toFixed(2)}</span>
                                    </div>
                                    <div className="text-sm pb-4 border-b font-semibold flex justify-between font-cormorant">
                                        <span>Estimated Total</span>
                                        <span className="text-lg">£ {totalPrice.toFixed(2)}</span>
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
