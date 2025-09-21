// Updated to use API data instead of hardcoded data
const initialState = {
    orderHistory: [],
    cart: [],
    inventory: [], // Will be loaded from API
    ordersLoading: false,
    ordersError: null
};

export default initialState;