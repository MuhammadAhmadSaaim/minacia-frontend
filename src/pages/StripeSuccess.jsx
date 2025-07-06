import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { clearCart } from '../redux/cartSlice';

const StripeSuccess = () => {
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    const token = useSelector(state => state.token?.token?.access);
    const cart = useSelector(state => state.cart.items);
    const subtotal = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('Rs', '').replace('£', '').trim());
        return sum + price * item.quantity;
    }, 0);
    const id = useSelector(state => state.token.id)
    const payload = cart.map(item => ({
        variant_id: item.selectedColor.id,
        quantity: item.quantity,
      }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const reduceQuantity = async () => {
            try {
                await axios.post(`${BASE_URL}/api/listing/reduceQuantity/`, payload, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json',
                    },
                  });
                await axios.post(`${BASE_URL}/api/stripe/save-payment/`, {
                    user: id,
                    method: "stripe",
                    amount: subtotal
                });

                dispatch(clearCart());
                navigate('/');
            } catch (error) {
                console.error("Quantity reduction failed:", error);
                navigate('/billing');  // fallback if something breaks
            }
        };

        reduceQuantity();
    }, [dispatch, navigate, token, cart, BASE_URL]);

    return <p className="text-center mt-20">Processing your order...</p>;
};

export default StripeSuccess;
