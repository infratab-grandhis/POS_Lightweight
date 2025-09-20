// Cart Actions
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const ADD_CUSTOMIZATION = 'ADD_CUSTOMIZATION';
export const REMOVE_CUSTOMIZATION = 'REMOVE_CUSTOMIZATION';

// Order History Actions
export const ADD_TO_ORDER_HISTORY = 'ADD_TO_ORDER_HISTORY';
export const CLEAR_ORDER_HISTORY = 'CLEAR_ORDER_HISTORY';

// Action Creators
export const addToCart = (product, quantity = 1, customizations = []) => ({
    type: ADD_TO_CART,
    payload: {
        id: `${product.id}_${Date.now()}`, // Unique cart item ID
        productId: product.id,
        product: product,
        quantity: quantity,
        customizations: customizations,
        totalPrice: (product.price + customizations.reduce((sum, custom) => sum + custom.price, 0)) * quantity,
        addedAt: new Date().toISOString()
    }
});

export const removeFromCart = (cartItemId) => ({
    type: REMOVE_FROM_CART,
    payload: cartItemId
});

export const updateCartQuantity = (cartItemId, quantity) => ({
    type: UPDATE_CART_QUANTITY,
    payload: { cartItemId, quantity }
});

export const clearCart = () => ({
    type: CLEAR_CART
});

export const addCustomization = (cartItemId, customization) => ({
    type: ADD_CUSTOMIZATION,
    payload: { cartItemId, customization }
});

export const removeCustomization = (cartItemId, customizationId) => ({
    type: REMOVE_CUSTOMIZATION,
    payload: { cartItemId, customizationId }
});

// Order History Action Creators
export const addToOrderHistory = (cartItems, totalAmount, paymentMethod = 'Card') => ({
    type: ADD_TO_ORDER_HISTORY,
    payload: {
        id: `order_${Date.now()}`,
        orderId: `ORD-${Date.now()}`,
        items: cartItems.map(item => ({...item})), // Deep copy
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
        status: 'Completed',
        orderDate: new Date().toISOString(),
        orderTime: new Date().toLocaleTimeString(),
        customerInfo: {
            type: 'Walk-in',
            orderType: 'Dine-in'
        }
    }
});

export const clearOrderHistory = () => ({
    type: CLEAR_ORDER_HISTORY
});

// Combined Checkout Action
export const processCheckout = (cartItems, totalAmount, paymentMethod = 'Card') => {
    return (dispatch) => {
        // Add to order history
        dispatch(addToOrderHistory(cartItems, totalAmount, paymentMethod));
        // Clear cart after successful checkout
        dispatch(clearCart());
    };
};
