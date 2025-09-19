import metaData from "./metaData";

const initialState =   {
    productsList: metaData?.products,
    inventoryData: metaData?.inventory
};

export default initialState;