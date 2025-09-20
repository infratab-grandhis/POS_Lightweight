import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './Order/reducer';
import productReducer from './Product/reducer';

const store = configureStore({
    reducer: {
        orderReducer,
        productReducer
    }
});

export default store;