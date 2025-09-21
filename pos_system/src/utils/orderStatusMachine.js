/**
 * Order Status State Machine
 * Handles order status transitions and filtering for the POS system
 */

// Order status constants
export const ORDER_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed', 
    PREPARING: 'preparing',
    READY: 'ready',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled'
};

// Status display names
export const STATUS_DISPLAY_NAMES = {
    [ORDER_STATUS.PENDING]: 'Pending',
    [ORDER_STATUS.CONFIRMED]: 'Confirmed',
    [ORDER_STATUS.PREPARING]: 'Preparing', 
    [ORDER_STATUS.READY]: 'Ready',
    [ORDER_STATUS.DELIVERED]: 'Delivered',
    [ORDER_STATUS.CANCELLED]: 'Cancelled'
};

// Status colors for UI
export const STATUS_COLORS = {
    [ORDER_STATUS.PENDING]: '#ffa500',     // Orange
    [ORDER_STATUS.CONFIRMED]: '#007bff',   // Blue
    [ORDER_STATUS.PREPARING]: '#17a2b8',   // Teal
    [ORDER_STATUS.READY]: '#28a745',       // Green
    [ORDER_STATUS.DELIVERED]: '#6c757d',   // Gray
    [ORDER_STATUS.CANCELLED]: '#dc3545'    // Red
};

// Valid status transitions
export const STATUS_TRANSITIONS = {
    [ORDER_STATUS.PENDING]: [ORDER_STATUS.CONFIRMED, ORDER_STATUS.CANCELLED],
    [ORDER_STATUS.CONFIRMED]: [ORDER_STATUS.PREPARING, ORDER_STATUS.CANCELLED],
    [ORDER_STATUS.PREPARING]: [ORDER_STATUS.READY, ORDER_STATUS.CANCELLED],
    [ORDER_STATUS.READY]: [ORDER_STATUS.DELIVERED],
    [ORDER_STATUS.DELIVERED]: [], // Final state
    [ORDER_STATUS.CANCELLED]: []  // Final state
};

/**
 * Check if a status transition is valid
 * @param {string} currentStatus - Current order status
 * @param {string} newStatus - Desired new status
 * @returns {boolean} - Whether the transition is allowed
 */
export const isValidStatusTransition = (currentStatus, newStatus) => {
    const allowedTransitions = STATUS_TRANSITIONS[currentStatus] || [];
    return allowedTransitions.includes(newStatus);
};

/**
 * Get next possible statuses for an order
 * @param {string} currentStatus - Current order status
 * @returns {Array} - Array of possible next statuses
 */
export const getNextPossibleStatuses = (currentStatus) => {
    return STATUS_TRANSITIONS[currentStatus] || [];
};

/**
 * Get all active orders (not delivered or cancelled)
 * @param {Array} orders - Array of order objects
 * @returns {Array} - Array of active orders
 */
export const getActiveOrders = (orders) => {
    if (!Array.isArray(orders)) {
        return [];
    }
    
    return orders.filter(order => {
        const status = order.status || ORDER_STATUS.PENDING;
        return status !== ORDER_STATUS.DELIVERED && status !== ORDER_STATUS.CANCELLED;
    });
};

/**
 * Get orders by status
 * @param {Array} orders - Array of order objects
 * @param {string} status - Status to filter by
 * @returns {Array} - Array of orders with specified status
 */
export const getOrdersByStatus = (orders, status) => {
    if (!Array.isArray(orders)) {
        return [];
    }
    
    return orders.filter(order => {
        const orderStatus = order.status || ORDER_STATUS.PENDING;
        return orderStatus === status;
    });
};

/**
 * Get orders that are ready for kitchen display
 * @param {Array} orders - Array of order objects  
 * @returns {Array} - Array of orders for kitchen
 */
export const getKitchenOrders = (orders) => {
    if (!Array.isArray(orders)) {
        return [];
    }
    
    return orders.filter(order => {
        const status = order.status || ORDER_STATUS.PENDING;
        return [ORDER_STATUS.CONFIRMED, ORDER_STATUS.PREPARING, ORDER_STATUS.READY].includes(status);
    });
};

/**
 * Calculate order completion rate
 * @param {Array} orders - Array of order objects
 * @returns {Object} - Statistics object with completion rates
 */
export const getOrderStatistics = (orders) => {
    if (!Array.isArray(orders) || orders.length === 0) {
        return {
            total: 0,
            completed: 0,
            active: 0,
            cancelled: 0,
            completionRate: 0
        };
    }
    
    const total = orders.length;
    const completed = orders.filter(order => 
        (order.status || ORDER_STATUS.PENDING) === ORDER_STATUS.DELIVERED
    ).length;
    const active = getActiveOrders(orders).length;
    const cancelled = orders.filter(order => 
        (order.status || ORDER_STATUS.PENDING) === ORDER_STATUS.CANCELLED
    ).length;
    
    return {
        total,
        completed,
        active,
        cancelled,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
};

/**
 * Get status color for UI components
 * @param {string} status - Order status
 * @returns {string} - Color hex code
 */
export const getStatusColor = (status) => {
    return STATUS_COLORS[status] || STATUS_COLORS[ORDER_STATUS.PENDING];
};

/**
 * Get status display name
 * @param {string} status - Order status
 * @returns {string} - Human-readable status name
 */
export const getStatusDisplayName = (status) => {
    return STATUS_DISPLAY_NAMES[status] || STATUS_DISPLAY_NAMES[ORDER_STATUS.PENDING];
};

/**
 * Check if order is in final state (delivered or cancelled)
 * @param {string} status - Order status
 * @returns {boolean} - Whether order is in final state
 */
export const isOrderFinal = (status) => {
    return status === ORDER_STATUS.DELIVERED || status === ORDER_STATUS.CANCELLED;
};

/**
 * Check if order can be cancelled
 * @param {string} status - Order status
 * @returns {boolean} - Whether order can be cancelled
 */
export const canCancelOrder = (status) => {
    return !isOrderFinal(status);
};

/**
 * Calculate estimated completion time for an order
 * @param {string} status - Current order status
 * @param {string} startTime - Order start time (ISO string)
 * @returns {string} - Estimated completion time (ISO string)
 */
export const calculateEstimatedCompletion = (status, startTime) => {
    // Estimated time in minutes for each status
    const statusTimes = {
        [ORDER_STATUS.PENDING]: 2,
        [ORDER_STATUS.CONFIRMED]: 5,
        [ORDER_STATUS.PREPARING]: 15,
        [ORDER_STATUS.READY]: 2,
        [ORDER_STATUS.DELIVERED]: 0,
        [ORDER_STATUS.CANCELLED]: 0
    };
    
    const totalMinutes = statusTimes[status] || 10;
    const start = new Date(startTime);
    const estimated = new Date(start.getTime() + (totalMinutes * 60 * 1000));
    
    return estimated.toISOString();
};

/**
 * Validate if a status transition is allowed (alias for compatibility)
 */
export const validateStatusTransition = isValidStatusTransition;

/**
 * Order statuses constant (alias for compatibility)
 */
export const ORDER_STATUSES = ORDER_STATUS;

const orderStatusMachine = {
    ORDER_STATUS,
    ORDER_STATUSES,
    STATUS_DISPLAY_NAMES,
    STATUS_COLORS,
    STATUS_TRANSITIONS,
    isValidStatusTransition,
    validateStatusTransition,
    getNextPossibleStatuses,
    getActiveOrders,
    getOrdersByStatus,
    getKitchenOrders,
    getOrderStatistics,
    getStatusColor,
    getStatusDisplayName,
    isOrderFinal,
    canCancelOrder,
    calculateEstimatedCompletion
};

export default orderStatusMachine;
