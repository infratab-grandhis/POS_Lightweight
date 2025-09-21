import initialState from "./state";
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    ADD_CUSTOMIZATION,
    REMOVE_CUSTOMIZATION,
    ADD_TO_ORDER_HISTORY,
    CLEAR_ORDER_HISTORY,
    UPDATE_INVENTORY,
    RESTORE_INVENTORY,
    RESET_INVENTORY,
    UPDATE_ORDER_STATUS,
    UPDATE_ORDER_SYNC_STATUS
} from "./action";
import { 
    FETCH_INVENTORY_SUCCESS,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_ERROR
} from '../Product/actions';

const orderReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, payload]
            };

        case REMOVE_FROM_CART:
            const itemToRemove = state.cart.find(item => item.id === payload);
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== payload),
                // Restore inventory when item is removed
                inventory: itemToRemove ? 
                    state.inventory.map(inv => 
                        inv.productId === itemToRemove.productId 
                            ? { ...inv, available: inv.available + itemToRemove.quantity }
                            : inv
                    ) : state.inventory
            };

        case UPDATE_CART_QUANTITY:
            const cartItem = state.cart.find(item => item.id === payload.cartItemId);
            if (!cartItem) return state;
            
            const quantityDifference = payload.quantity - cartItem.quantity;
            
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
                ),
                // Update inventory based on quantity change
                inventory: state.inventory.map(inv => 
                    inv.productId === cartItem.productId 
                        ? { ...inv, available: inv.available - quantityDifference }
                        : inv
                )
            };

        case CLEAR_CART:
            // Don't restore inventory when clearing cart after checkout
            // Inventory is already consumed at this point
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

        case UPDATE_INVENTORY:
            return {
                ...state,
                inventory: state.inventory.map(item => 
                    item.productId === payload.productId 
                        ? { ...item, available: item.available - payload.quantityUsed }
                        : item
                )
            };

        case RESTORE_INVENTORY:
            return {
                ...state,
                inventory: state.inventory.map(item =>
                    item.productId === payload.productId 
                        ? { ...item, available: item.available + payload.quantityToRestore }
                        : item
                )
            };

        case RESET_INVENTORY:
            return {
                ...state,
                inventory: [...payload] // Replace entire inventory with fresh data
            };

        case UPDATE_ORDER_STATUS:
            return {
                ...state,
                orderHistory: state.orderHistory.map(order => {
                    if (order.id === payload.orderId) {
                        return {
                            ...order,
                            status: payload.newStatus,
                            estimatedCompletion: payload.estimatedCompletion,
                            lastUpdated: payload.timestamp,
                            statusHistory: [
                                ...(order.statusHistory || []),
                                {
                                    status: payload.newStatus,
                                    timestamp: payload.timestamp,
                                    updatedBy: payload.updatedBy,
                                    notes: payload.notes
                                }
                            ]
                        };
                    }
                    return order;
                })
            };

        case FETCH_INVENTORY_SUCCESS:
            return {
                ...state,
                inventory: payload
            };

        case FETCH_ORDERS_START:
            return {
                ...state,
                ordersLoading: true,
                ordersError: null
            };

        case FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                ordersLoading: false,
                ordersError: null,
                orderHistory: payload // Update order history from API
            };

        case FETCH_ORDERS_ERROR:
            return {
                ...state,
                ordersLoading: false,
                ordersError: payload
            };

        case UPDATE_ORDER_SYNC_STATUS:
            return {
                ...state,
                orderHistory: state.orderHistory.map(order =>
                    order.id === payload.orderId
                        ? { ...order, syncStatus: payload.syncStatus }
                        : order
                )
            };

        default:
            return state;
    }
};

export default orderReducer;
