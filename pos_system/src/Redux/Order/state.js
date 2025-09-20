import metaData from "../Product/metaData";

const initialState = {
    orderHistory: [],
    cart: [],
    inventory: [...metaData.inventory] // Always use fresh inventory from metaData
};

export default initialState;