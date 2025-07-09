import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { clearCart } from '../redux/cartSlice';


const StripeSuccess = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const token = useSelector((state) => state.token?.token?.access);
  const cart = useSelector((state) => state.cart.items);
  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('Rs', '').replace('£', '').trim());
    return sum + price * item.quantity;
  }, 0)
  const shipping = parseFloat(localStorage.getItem("shippingCost")) || 0;
  const tax = parseFloat(localStorage.getItem("taxRate") || 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity,
    0);
  const billingInfoId = parseInt(localStorage.getItem("billingInfoId"));
  const id = useSelector((state) => state.token.id);
  const payload = cart.map((item) => ({
    variant_id: item.selectedColor.id,
    quantity: item.quantity,
  }));



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  useEffect(() => {
    localStorage.removeItem("billingFormData");
  }, []);


  useEffect(() => {
    const reduceQuantity = async () => {
      try {
        await axios.post(`${BASE_URL}/api/listing/reduceQuantity/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });


        const paymentRes = await axios.post(`${BASE_URL}/api/stripe/save-payment/`, {
          user: id,
          method: 'stripe',
          amount: subtotal,
          billing_info: billingInfoId,
          status: 'paid',
        });
        await axios.post(`${BASE_URL}/api/listing/orderCreatation/`, {
          user: id,
          billing_info: parseInt(localStorage.getItem("billingInfoId")),
          payment: parseInt(paymentRes.data.id),
          order_amount: subtotal,
          tax,
          shipping_cost: shipping,
          total_items: totalItems,
          status: "processing",
          items: cart.map(item => ({
            product: item.id,
            color_variant: item.selectedColor.id,
            product_name: item.name,
            product_price: parseFloat(item.price),
            quantity: item.quantity
          }))
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        localStorage.removeItem("billingInfoId");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("subtotal");
        dispatch(clearCart());
        setIsProcessing(false);
      } catch (error) {
        console.error('Quantity reduction failed:', error);
        navigate('/billing');
      }
    };

    reduceQuantity();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center font-cormorant px-4">
      {isProcessing ? (
        <p className="text-xl md:text-2xl text-gray-600">Processing your order...</p>
      ) : (
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-green-700">Thank You for Shopping!</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700">
            Your order was successfully placed and will be delivered soon.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default StripeSuccess;
