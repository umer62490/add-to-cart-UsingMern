import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default is localStorage for web
import userReducer from './user/userSlice';
import cartReducer from './cart/cartSlice';
import productReducer from './product/productSlice';

// Persist configuration
const persistConfig = {
    key: 'root', // The root key for persisting
    storage,     // Where to persist (localStorage in this case)
    whitelist: ['user'], // Only persist the 'user' slice
};

// Reducer setup
const rootReducer = {
    user: persistReducer(persistConfig, userReducer), // Persisted reducer for 'user'
    cart: cartReducer, // Non-persisted reducer for 'cart'
    product: productReducer, // Non-persisted reducer for 'product'
};

// Store configuration
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Turn off serializable checks for Redux Persist compatibility
        }),
});

// Persistor for managing rehydration
const persistor = persistStore(store);

// Exports
export { store, persistor };
