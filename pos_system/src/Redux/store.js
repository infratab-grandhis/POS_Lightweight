import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './Order/reducer';
import productReducer from './Product/reducer';

const store = configureStore({
    reducer: {
        orderReducer,
        productReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true, // Enable thunk middleware for async actions
        })
});

export default store;