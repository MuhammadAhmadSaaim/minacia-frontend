import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const { product, quantity } = action.payload;
            const existingProductIndex = state.items.findIndex(item => item.id === product.id);
            if (existingProductIndex >= 0) {
                state.items[existingProductIndex].quantity += quantity;
            } else {
                state.items.push({ ...product, quantity });
            }
        },
        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const productIndex = state.items.findIndex(item => item.id === productId);
            if (productIndex >= 0) {
                state.items[productIndex].quantity = quantity;
            }
        },
        removeFromCart: (state, action) => {
            const { productId } = action.payload;
            state.items = state.items.filter(item => item.id !== productId);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
