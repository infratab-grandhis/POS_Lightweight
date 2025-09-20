import { useDispatch } from 'react-redux';
import { 
    showSuccessNotification, 
    showErrorNotification, 
    showWarningNotification, 
    showInfoNotification,
    showOrderSuccessNotification,
    showAddToCartNotification,
    showStockWarningNotification,
    showPrintErrorNotification,
    showNetworkErrorNotification,
    showNetworkRestoreNotification
} from '../Redux/Notification/actions';

/**
 * Custom hook for managing notifications
 * Provides easy access to notification actions
 */
export const useNotification = () => {
    const dispatch = useDispatch();

    return {
        // Basic notifications
        success: (message, options) => dispatch(showSuccessNotification(message, options)),
        error: (message, options) => dispatch(showErrorNotification(message, options)),
        warning: (message, options) => dispatch(showWarningNotification(message, options)),
        info: (message, options) => dispatch(showInfoNotification(message, options)),

        // POS-specific notifications
        orderSuccess: (orderId, total) => dispatch(showOrderSuccessNotification(orderId, total)),
        addToCart: (productName, quantity) => dispatch(showAddToCartNotification(productName, quantity)),
        stockWarning: (productName, available) => dispatch(showStockWarningNotification(productName, available)),
        printError: () => dispatch(showPrintErrorNotification()),
        networkError: () => dispatch(showNetworkErrorNotification()),
        networkRestore: () => dispatch(showNetworkRestoreNotification()),

        // Custom notification
        custom: (notification) => dispatch(addNotification(notification))
    };
};
