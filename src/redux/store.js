import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import productsReducer from './productSlice';
import cartReducer from './cartSlice';
import jwtSlice from './jwtSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['products', 'cart', 'token'],
};

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  token: jwtSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
