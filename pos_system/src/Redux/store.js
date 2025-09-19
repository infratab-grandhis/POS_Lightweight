import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import orderReducer from './Order/reducer';
import productReducer from './Product/reducer';

const rootReducer = combineReducers({
    orderReducer,
    productReducer
});

const store = configureStore({
    reducer: rootReducer
});

export default store;