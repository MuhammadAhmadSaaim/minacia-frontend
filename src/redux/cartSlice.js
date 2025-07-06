import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const syncCartQuantities = createAsyncThunk(
    'cart/syncCartQuantities',
    async (_, { getState, dispatch }) => {
        const { items } = getState().cart;

        const payload = {
            items: items.map(item => ({
                productId: item.id,
                selectedColorId: item.selectedColor?.id,
            })),
        };

        const BASE_URL = process.env.REACT_APP_BACKEND_URL;

        try {
            const res = await axios.post(`${BASE_URL}/api/listing/cartvalidate/`, payload);
            const backendData = res.data; // [{ productId, selectedColorId, currentStock }]

            backendData.forEach(serverItem => {
                const matchingLocalItem = items.find(
                    item =>
                        item.id === serverItem.productId &&
                        item.selectedColor?.id === serverItem.selectedColorId
                );

                if (!matchingLocalItem) return;

                if (serverItem.currentStock === 0) {
                    dispatch(removeFromCart({
                        productId: serverItem.productId,
                        selectedColorId: serverItem.selectedColorId,
                    }));
                } else if (matchingLocalItem.quantity > serverItem.currentStock) {
                    dispatch(updateQuantity({
                        productId: serverItem.productId,
                        selectedColorId: serverItem.selectedColorId,
                        quantity: serverItem.currentStock,
                    }));
                }
            });

        } catch (err) {
            console.error("Cart sync failed:", err);
        }
    }
);


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {

            const { product, quantity, selectedColor } = action.payload;
            if (!selectedColor || selectedColor.quantity === 0) {
                return; // Don't add if variant is out of stock
            }

            // Check for existing product + same color variant in cart
            const existingProductIndex = state.items.findIndex(
                item => item.id === product.id && item.selectedColor?.id === selectedColor?.id
            );

            if (existingProductIndex >= 0) {
                const existingItem = state.items[existingProductIndex];
                const totalAfterAdd = existingItem.quantity + quantity;
                if (totalAfterAdd > selectedColor.quantity) {
                  return; // prevent overflow
                }
                existingItem.quantity += quantity;        
              
            } else {
                state.items.push({
                    ...product,
                    quantity,
                    selectedColor,
                });
            }
        },
        updateQuantity: (state, action) => {
            const { productId, selectedColorId, quantity } = action.payload;
            const productIndex = state.items.findIndex(
                item => item.id === productId && item.selectedColor?.id === selectedColorId
            );
            if (productIndex >= 0) {
                const maxQty = state.items[productIndex].selectedColor?.quantity || 1;
                if (quantity <= maxQty) {
                    state.items[productIndex].quantity = quantity;
                }
            }
        },
        removeFromCart: (state, action) => {
            const { productId, selectedColorId } = action.payload;
            state.items = state.items.filter(item => {
                return !(item.id === productId && item.selectedColor?.id === selectedColorId);
            });
        },
        
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
