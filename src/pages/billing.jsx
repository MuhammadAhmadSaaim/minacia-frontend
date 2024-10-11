import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Payment from '../components/payment'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import axios from 'axios';


function Billing() {
    const id =  useSelector(state => state.token.id)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] =  useState();
    const { totalItems, price } = location.state || {};
    const token = useSelector(state => state.token?.token?.access);
    
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        phone: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (token == null) {
            navigate("/login");
        }
    }, [token]);

    useEffect(() => {
        const { name, address, email, phone } = formData;
        setIsFormValid(name && address && email && phone);
    }, [formData]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const savePayment = async () => {
        const paymentInfo = {
            method: 'paypal',
            amount: price,
            user: id
        };
        try {
            await axios.post('http://localhost:8000/api/payment/save-payment/', paymentInfo,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
        } catch (err) {
            console.error('Error saving payment:', err);
        }
    };

    const saveInfo = async () => {
        const billingInfo = {
            name: formData.name,
            address: formData.address,
            email: formData.email,
            phone: formData.phone,
            price,
            total_items: totalItems,
            user: id
        };

        try {
            await axios.post('http://localhost:8000/api/payment/save-billing-info/', billingInfo, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            savePayment();
            dispatch(clearCart());
            navigate('/');

        } catch (err) {
            setError(err)    
        }
    };

    return (
        <div>
            <script src="https://www.paypal.com/sdk/js?client-id=AY-NPFnM2JVT-m2ESlTT2UXbM7A5C3qy0bXwrtheGEwwFcRysCxUqCrr2UPcixllDvosLclpLkyV55FK&currency=USD"></script>
            <Navbar isNotLanding="True" />
            <div className="min-h-screen mt-20 md:mt-52">
                <div className="container px-6 py-12 mx-auto flex flex-col md:flex-row sm:flex-cols gap-4">
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4 h-full">
                            <h2 className="text-3xl text-black mt-2 font-bold mb-4">Enter Information to Proceed</h2>
                            <h3 className="mt-3">{error ? error.toString() : null}</h3>
                            <form onSubmit={e => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block">
                                            <span className="block text-xl mb-1 mt-4 font-md text-black">Name</span>
                                            <input
                                                type="text"
                                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder="Minal Anwar"
                                                id="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block">
                                            <span className="block text-xl mb-1 mt-4 font-md text-black">Address</span>
                                            <input
                                                type="text"
                                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder="123 Street, City, Country"
                                                id="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block">
                                            <span className="block text-xl mb-1 font-md text-black">Email</span>
                                            <input
                                                type="email"
                                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder="example@example.com"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block">
                                            <span className="block text-xl mb-1 font-md text-black">Phone Number</span>
                                            <input
                                                type="tel"
                                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:shadow-outline"
                                                placeholder="0309-8886702"
                                                id="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-lg shadow-md p-6 h-full">
                            <h2 className="text-3xl text-black font-bold mb-4">Summary</h2>
                            <div className="flex text-gray-700 text-lg justify-between mb-2">
                                <span>Price</span>
                                <span>{price}</span>
                            </div>
                            <div className="flex text-gray-700 text-lg justify-between mb-8">
                                <span>Total Items</span>
                                <span>{totalItems}</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex text-gray-700 text-lg justify-between mb-6">
                                <span className="font-semibold">Total</span>
                                <span className="font-semibold">{price}</span>
                            </div>
                            {!isFormValid ? 
                                <button
                                    className="w-full py-2 px-4 text-white rounded bg-gray-600"
                                    disabled={!isFormValid}
                                >
                                    PayPal
                                </button>
                                :
                                <Payment amount={price} name={totalItems} saveInfo={saveInfo}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Billing;
