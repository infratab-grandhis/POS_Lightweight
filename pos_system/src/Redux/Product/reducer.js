import initialState from "./state";
import {
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    FETCH_INVENTORY_START,
    FETCH_INVENTORY_SUCCESS,
    FETCH_INVENTORY_ERROR
} from './actions';

const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_PRODUCTS_START:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                productsList: payload.products,
                pagination: payload.pagination
            };

        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
                productsList: []
            };

        case FETCH_INVENTORY_START:
            return {
                ...state,
                inventoryLoading: true,
                inventoryError: null
            };

        case FETCH_INVENTORY_SUCCESS:
            return {
                ...state,
                inventoryLoading: false,
                inventoryError: null,
                inventoryData: payload
            };

        case FETCH_INVENTORY_ERROR:
            return {
                ...state,
                inventoryLoading: false,
                inventoryError: payload,
                inventoryData: []
            };

        default:
            return state;
    }
};

export default productReducer;
