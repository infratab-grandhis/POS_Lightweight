import initialState from "./state";
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    ADD_CUSTOMIZATION,
    REMOVE_CUSTOMIZATION,
    ADD_TO_ORDER_HISTORY,
    CLEAR_ORDER_HISTORY
} from "./action";

const orderReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, payload]
            };

        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== payload)
            };

        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cart: state.cart.map(item => 
                    item.id === payload.cartItemId 
                        ? { 
                            ...item, 
                            quantity: payload.quantity,
                            totalPrice: (item.product.price + item.customizations.reduce((sum, custom) => sum + custom.price, 0)) * payload.quantity
                        }
                        : item
                )
            };

        case CLEAR_CART:
            return {
                ...state,
                cart: []
            };

        case ADD_CUSTOMIZATION:
            return {
                ...state,
                cart: state.cart.map(item => 
                    item.id === payload.cartItemId 
                        ? { 
                            ...item, 
                            customizations: [...item.customizations, payload.customization],
                            totalPrice: (item.product.price + [...item.customizations, payload.customization].reduce((sum, custom) => sum + custom.price, 0)) * item.quantity
                        }
                        : item
                )
            };

        case REMOVE_CUSTOMIZATION:
            return {
                ...state,
                cart: state.cart.map(item => 
                    item.id === payload.cartItemId 
                        ? { 
                            ...item, 
                            customizations: item.customizations.filter(custom => custom.id !== payload.customizationId),
                            totalPrice: (item.product.price + item.customizations.filter(custom => custom.id !== payload.customizationId).reduce((sum, custom) => sum + custom.price, 0)) * item.quantity
                        }
                        : item
                )
            };

        case ADD_TO_ORDER_HISTORY:
            return {
                ...state,
                orderHistory: [payload, ...state.orderHistory] // Add new order at the beginning
            };

        case CLEAR_ORDER_HISTORY:
            return {
                ...state,
                orderHistory: []
            };

        default:
            return state;
    }
};

export default orderReducer;
