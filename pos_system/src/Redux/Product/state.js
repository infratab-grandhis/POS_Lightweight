// Updated to use API data instead of hardcoded data
const initialState = {
    productsList: [], // Will be loaded from API
    inventoryData: [], // Will be loaded from API
    loading: false,
    error: null,
    inventoryLoading: false,
    inventoryError: null,
    pagination: null
};

export default initialState;