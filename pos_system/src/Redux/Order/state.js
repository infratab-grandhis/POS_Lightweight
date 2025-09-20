import metaData from "../Product/metaData";

const initialState = {
    orderHistory: [],
    cart: [],
    inventory: [...metaData.inventory] // Copy inventory from product metadata
};

export default initialState;