import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const shippingCountries = [
    { code: "GB", name: "United Kingdom" },
    { code: "IE", name: "Ireland" },
    { code: "US", name: "United States" },
    { code: "AU", name: "Australia" },
    { code: "CA", name: "Canada" },
    { code: "FR", name: "France" },
    { code: "DE", name: "Germany" },
    { code: "IT", name: "Italy" },
    { code: "NL", name: "Netherlands" },
    { code: "ES", name: "Spain" },
    { code: "PT", name: "Portugal" },
    { code: "BE", name: "Belgium" },
    { code: "CH", name: "Switzerland" },
    { code: "LU", name: "Luxembourg" },
    { code: "AT", name: "Austria" },
    { code: "HR", name: "Croatia" },
    { code: "SI", name: "Slovenia" },
    { code: "SK", name: "Slovakia" },
    { code: "CZ", name: "Czech Republic" },
    { code: "HU", name: "Hungary" },
    { code: "PL", name: "Poland" },
    { code: "RO", name: "Romania" },
    { code: "RS", name: "Serbia" },
    { code: "BG", name: "Bulgaria" },
    { code: "GR", name: "Greece" },
    { code: "AL", name: "Albania" },
    { code: "XK", name: "Kosovo" },
    { code: "BA", name: "Bosnia and Herzegovina" },
    { code: "ME", name: "Montenegro" },
    { code: "MK", name: "North Macedonia" },
    { code: "MT", name: "Malta" },
    { code: "CY", name: "Cyprus" },
    { code: "DK", name: "Denmark" },
    { code: "LT", name: "Lithuania" },
    { code: "LV", name: "Latvia" },
    { code: "EE", name: "Estonia" },
    { code: "SE", name: "Sweden" },
    { code: "NO", name: "Norway" },
    { code: "FI", name: "Finland" },
    { code: "EG", name: "Egypt" },
    { code: "TR", name: "Turkey" },
    { code: "JO", name: "Jordan" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "KW", name: "Kuwait" },
    { code: "BH", name: "Bahrain" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "QA", name: "Qatar" },
    { code: "TM", name: "Turkmenistan" },
    { code: "UZ", name: "Uzbekistan" },
    { code: "KZ", name: "Kazakhstan" },
    { code: "KG", name: "Kyrgyzstan" },
    { code: "TJ", name: "Tajikistan" },
    { code: "MY", name: "Malaysia" },
    { code: "SG", name: "Singapore" },
    { code: "MX", name: "Mexico" },
    { code: "IS", name: "Iceland" },
    { code: "GL", name: "Greenland" },
    { code: "BR", name: "Brazil" },
    { code: "AR", name: "Argentina" },
    { code: "ZA", name: "South Africa" },
    { code: "TN", name: "Tunisia" },
    { code: "MA", name: "Morocco" },
    { code: "DZ", name: "Algeria" },
    { code: "GG", name: "Guernsey" },
    { code: "JE", name: "Jersey" },
    { code: "NZ", name: "New Zealand" }
];

function Billing() {
    const BASE_URL = process.env.REACT_APP_BACKEND_URL
    const id = useSelector(state => state.token.id)
    const navigate = useNavigate();
    const [error, setError] = useState();
    const cartItems = useSelector(state => state.cart.items);
    const subtotal = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('Rs', '').replace('£', '').trim());
        return sum + price * item.quantity;
    }, 0);
    const [taxRate, setTaxRate] = useState(0); // Default to 17% if API fails
    
        useEffect(() => {
            fetch(`/api/listing/additionalPays/`)
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

    const taxes = subtotal * (taxRate / 100);
    const totalPrice = subtotal + taxes;
    const price = totalPrice;
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const token = useSelector(state => state.token?.token?.access);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
        country: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        const savedData = localStorage.getItem("billingFormData");
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        if (token == null) {
            navigate("/login", { state: { from: "/billing" } });
        }
    }, [token]);
    
    useEffect(() => {
        const { name, address, email, phone, country} = formData;
        setIsFormValid(name && address && email && phone && country);
    }, [formData]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };


    const stripePayment = async () => {
        const paymentInfo = {
            method: 'stripe',
            amount: price,
            user: id,
            country: formData.country
        };
        try {
            await saveInfo();
            localStorage.setItem("billingFormData", JSON.stringify(formData));

            const resp = await axios.post(`/api/stripe/create-stripe-session/`, paymentInfo, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            window.location.href = resp.data.url;

        } catch (err) {
            console.error('Error making payment:', err);
            if (err.response?.status === 401) {
                navigate("/login", { state: { from: "/billing" } });
            } else {
                setError("Something went wrong while processing payment.");
            }
        }
    };


    const saveInfo = async () => {
        try {
            const check = await axios.get(`/api/stripe/check-billing-info/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (!check.data.exists) {
                const billingInfo = {
                    name: formData.name,
                    address: formData.address,
                    email: formData.email,
                    phone: formData.phone,
                    user: id
                };

                await axios.post(`/api/stripe/save-billing-info/`, billingInfo, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
            }
        } catch (err) {
            if (err.response?.status === 401) {
                navigate("/login", { state: { from: "/billing" } });
            } else {
                setError(err.response?.data?.detail || "Billing info failed to save.");
            }
        }
    };

    return (
        <div>

            <div className="min-h-screen mt-14 md:mt-36">
                <div className="container px-6 py-12 mx-auto flex flex-col md:flex-row sm:flex-cols gap-4">
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4 h-full">
                            <h2 className="text-3xl text-black mt-2 font-bold mb-4">Enter Billing Information to Proceed</h2>
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
                                    <div>
                                        <label className="block mt-6">
                                            <span className="block text-xl mb-1 font-md text-black">Shipping Country</span>
                                            <select
                                                name="country"
                                                id="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                                required
                                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            >
                                                <option value="" disabled>Select a country</option>
                                                {shippingCountries.map((country) => (<option key={country.code} value={country.code}> {country.name} </option>))} </select> </label>
                                    <p className='text-md py-3 mb-1 font-md text-gray-500'>Please select shipping country. Shipping price will be calculated upon checkout.</p>
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
                                <span>£{price.toFixed(2)}</span>
                            </div>
                            <div className="flex text-gray-700 text-lg justify-between mb-8">
                                <span>Total Items</span>
                                <span>{totalItems}</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex text-gray-700 text-lg justify-between mb-6">
                                <span className="font-semibold">Total</span>
                                <span className="font-semibold">£{price.toFixed(2)}</span>
                            </div>
                            {!isFormValid ?
                                <button
                                    className="w-full py-2 px-4 text-white rounded bg-gray-600"
                                    disabled={!isFormValid}>CHECKOUT</button>
                                :
                                //<Payment amount={price} name={totalItems} saveInfo={saveInfo}/>

                                <button className="w-full py-2 px-4 text-white rounded bg-purple-600" type="submit"
                                    onClick={stripePayment}>
                                    CHECKOUT
                                </button>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Billing;
