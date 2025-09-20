// Notification Actions
let notificationIdCounter = 0;

// Action Types
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const CLEAR_ALL_NOTIFICATIONS = 'CLEAR_ALL_NOTIFICATIONS';

// Action Creators
export const addNotification = (notification) => ({
    type: ADD_NOTIFICATION,
    payload: {
        id: ++notificationIdCounter,
        timestamp: Date.now(),
        duration: 5000, // default 5 seconds
        persistent: false,
        ...notification
    }
});

export const removeNotification = (id) => ({
    type: REMOVE_NOTIFICATION,
    payload: id
});

export const clearAllNotifications = () => ({
    type: CLEAR_ALL_NOTIFICATIONS
});

// Helper action creators for different notification types
export const showSuccessNotification = (message, options = {}) => 
    addNotification({
        type: 'success',
        message,
        title: options.title || 'Success',
        duration: options.duration || 4000,
        ...options
    });

export const showErrorNotification = (message, options = {}) => 
    addNotification({
        type: 'error',
        message,
        title: options.title || 'Error',
        duration: options.duration || 6000,
        ...options
    });

export const showWarningNotification = (message, options = {}) => 
    addNotification({
        type: 'warning',
        message,
        title: options.title || 'Warning',
        duration: options.duration || 5000,
        ...options
    });

export const showInfoNotification = (message, options = {}) => 
    addNotification({
        type: 'info',
        message,
        title: options.title || 'Information',
        duration: options.duration || 4000,
        ...options
    });

// POS-specific notifications
export const showOrderSuccessNotification = (orderId, total) => 
    showSuccessNotification(
        `Order ${orderId} completed successfully! Total: ₹${total.toFixed(2)}`,
        {
            title: 'Order Completed',
            duration: 5000
        }
    );

export const showAddToCartNotification = (productName, quantity) => 
    showSuccessNotification(
        `${quantity}x ${productName} added to cart`,
        {
            title: 'Added to Cart',
            duration: 3000
        }
    );

export const showStockWarningNotification = (productName, available) => 
    showWarningNotification(
        `Only ${available} ${productName} left in stock!`,
        {
            title: 'Low Stock Alert',
            duration: 4000
        }
    );

export const showPrintErrorNotification = () => 
    showErrorNotification(
        'Unable to print receipt. Please check your printer connection.',
        {
            title: 'Print Failed',
            duration: 6000
        }
    );

export const showNetworkErrorNotification = () => 
    showErrorNotification(
        'Network connection lost. Some features may be limited.',
        {
            title: 'Connection Issue',
            persistent: true
        }
    );

export const showNetworkRestoreNotification = () => 
    showSuccessNotification(
        'Network connection restored. All features are now available.',
        {
            title: 'Connected',
            duration: 3000
        }
    );
