import metaData from "./metaData";

const initialState =   {
    productsList: metaData?.products,
    inventoryData: metaData?.inventory,
    orderHistoty: [],
    cartData: []
};

export default initialState;