import ApiService from '../../services/api';

// Action Types
export const FETCH_PRODUCTS_START = 'FETCH_PRODUCTS_START';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';

export const FETCH_INVENTORY_START = 'FETCH_INVENTORY_START';
export const FETCH_INVENTORY_SUCCESS = 'FETCH_INVENTORY_SUCCESS';
export const FETCH_INVENTORY_ERROR = 'FETCH_INVENTORY_ERROR';

// Action Creators
export const fetchProductsStart = () => ({
    type: FETCH_PRODUCTS_START
});

export const fetchProductsSuccess = (products, pagination = {}) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { products, pagination }
});

export const fetchProductsError = (error) => ({
    type: FETCH_PRODUCTS_ERROR,
    payload: error
});

export const fetchInventoryStart = () => ({
    type: FETCH_INVENTORY_START
});

export const fetchInventorySuccess = (inventory) => ({
    type: FETCH_INVENTORY_SUCCESS,
    payload: inventory
});

export const fetchInventoryError = (error) => ({
    type: FETCH_INVENTORY_ERROR,
    payload: error
});

// Thunk Actions
export const fetchProducts = (page = 1, limit = 30, filters = {}) => {
    return async (dispatch) => {
        dispatch(fetchProductsStart());
        
        try {
            const result = await ApiService.getProducts({ 
                page, 
                limit, 
                ...filters 
            });
            
            if (result.success) {
                dispatch(fetchProductsSuccess(
                    result.data, 
                    result.pagination
                ));
            } else {
                dispatch(fetchProductsError('Failed to fetch products'));
            }
        } catch (error) {
            dispatch(fetchProductsError(error.message));
        }
    };
};

export const fetchMoreProducts = (page, limit = 30, filters = {}) => {
    return async (dispatch, getState) => {
        try {
            const result = await ApiService.getProducts({ 
                page, 
                limit, 
                ...filters 
            });
            
            if (result.success) {
                const currentProducts = getState().productReducer.productsList;
                dispatch(fetchProductsSuccess(
                    [...currentProducts, ...result.data], // Append new products
                    result.pagination
                ));
            }
        } catch (error) {
            dispatch(fetchProductsError(error.message));
        }
    };
};

export const fetchInventory = () => {
    return async (dispatch) => {
        dispatch(fetchInventoryStart());
        
        try {
            const result = await ApiService.getInventory();
            
            if (result.success) {
                dispatch(fetchInventorySuccess(result.data));
            } else {
                dispatch(fetchInventoryError('Failed to fetch inventory'));
            }
        } catch (error) {
            dispatch(fetchInventoryError(error.message));
        }
    };
};

// Load initial data for Products page specifically
export const initializeProductsPageData = () => {
    return async (dispatch) => {
        try {
            // Load first page of products + all inventory
            await Promise.all([
                dispatch(fetchProducts(1, 30)), // First 30 products
                dispatch(fetchInventory()) // All inventory (needed for stock info)
            ]);
        } catch (error) {
            dispatch(fetchProductsError('Failed to load products data'));
        }
    };
};

// Action Types for Orders
export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';

// Actions for Orders (to be used by Kitchen Display)
export const fetchOrdersStart = () => ({
    type: FETCH_ORDERS_START
});

export const fetchOrdersSuccess = (orders) => ({
    type: FETCH_ORDERS_SUCCESS,
    payload: orders
});

export const fetchOrdersError = (error) => ({
    type: FETCH_ORDERS_ERROR,
    payload: error
});

// Fetch orders from API
export const fetchOrders = () => {
    return async (dispatch) => {
        dispatch(fetchOrdersStart());
        
        try {
            const result = await ApiService.getOrders();
            
            if (result.success) {
                dispatch(fetchOrdersSuccess(result.data));
            } else {
                dispatch(fetchOrdersError('Failed to fetch orders'));
            }
        } catch (error) {
            dispatch(fetchOrdersError(error.message));
        }
    };
};
