import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OuterLayout from '../Layouts/OuterLayout';
import { getStatusColor, getStatusDisplayName, getNextPossibleStatuses, ORDER_STATUS } from '../utils/orderStatusMachine';
import { fetchOrders } from '../Redux/Product/actions';
import { updateOrderStatus } from '../Redux/Order/action';
import ApiService from '../services/api';
import PriceDisplay from '../Components/common/PriceDisplay';

const KitchenDisplay = () => {
    const dispatch = useDispatch();
    const orderHistory = useSelector(state => state.orderReducer.orderHistory);
    const ordersLoading = useSelector(state => state.orderReducer.ordersLoading);
    const ordersError = useSelector(state => state.orderReducer.ordersError);
    const [updatingOrderId, setUpdatingOrderId] = useState(null);

    // Load orders from API when component mounts with polling
    useEffect(() => {
        dispatch(fetchOrders());
        
        // Set up polling to refresh orders every 30 seconds
        const interval = setInterval(() => {
            dispatch(fetchOrders());
        }, 30000);
        
        // Clean up interval on component unmount
        return () => {
            clearInterval(interval);
        };
    }, [dispatch]);

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit'
        });
    };

    const getTimeSinceOrder = (orderDate) => {
        const now = new Date();
        const order = new Date(orderDate);
        const diffMinutes = Math.floor((now - order) / (1000 * 60));
        
        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        const hours = Math.floor(diffMinutes / 60);
        return `${hours}h ${diffMinutes % 60}m ago`;
    };

    // Handle order status updates
    const handleStatusUpdate = async (orderId, newStatus) => {
        setUpdatingOrderId(orderId);
        
        try {
            // Find the current order to get existing status history
            const currentOrder = orderHistory.find(order => order.id === orderId);
            const currentStatusHistory = currentOrder?.statusHistory || [];
            
            // Create new status history entry
            const newStatusEntry = {
                status: newStatus,
                timestamp: new Date().toISOString(),
                updatedBy: 'kitchen',
                notes: `Status changed to ${newStatus} from Kitchen Display`
            };
            
            // Update via API first - pass status with updated history
            const statusData = {
                status: newStatus,
                lastUpdated: new Date().toISOString(),
                updatedBy: 'kitchen',
                statusHistory: [...currentStatusHistory, newStatusEntry]
            };
            
            const result = await ApiService.updateOrderStatus(orderId, statusData);
            
            if (result.success) {
                // Update local Redux state
                dispatch(updateOrderStatus(orderId, newStatus, 'Updated from Kitchen Display', 'kitchen'));
                
                // Refresh orders from API to get latest data
                dispatch(fetchOrders());
            }
        } catch (error) {
            // Handle error silently in production
        } finally {
            setUpdatingOrderId(null);
        }
    };

    // Separate orders by status for Kanban-style layout
    const preparingOrders = orderHistory.filter(order => order.status === ORDER_STATUS.PREPARING);
    const readyOrders = orderHistory.filter(order => order.status === ORDER_STATUS.READY);
    const deliveredOrders = orderHistory.filter(order => order.status === ORDER_STATUS.DELIVERED);
    const cancelledOrders = orderHistory.filter(order => order.status === ORDER_STATUS.CANCELLED);

    // Responsive Styles
    const containerStyle = {
        padding: '10px',
        maxWidth: '100%',
        margin: '0 auto'
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: '2px solid #eee',
        paddingBottom: '15px',
        flexWrap: 'wrap',
        gap: '10px'
    };

    const kanbanContainerStyle = {
        display: 'flex',
        gap: '10px',
        height: 'calc(100vh - 140px)',
        overflow: window.innerWidth < 768 ? 'auto' : 'hidden',
        overflowX: window.innerWidth < 768 ? 'hidden' : 'auto',
        overflowY: window.innerWidth < 768 ? 'auto' : 'hidden',
        flexDirection: window.innerWidth < 768 ? 'column' : 'row'
    };

    const columnStyle = {
        flex: window.innerWidth < 768 ? 'none' : '1',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minHeight: window.innerWidth < 768 ? '250px' : 'auto',
        minWidth: window.innerWidth >= 768 ? '250px' : 'auto'
    };

    const columnHeaderStyle = (color) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        backgroundColor: color,
        color: 'white',
        borderRadius: '6px',
        marginBottom: '10px',
        fontSize: window.innerWidth < 768 ? '14px' : '16px',
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    });

    const ordersListStyle = {
        flex: '1',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: window.innerWidth < 768 ? 'row' : 'column',
        gap: '8px',
        overflowX: window.innerWidth < 768 ? 'auto' : 'visible'
    };

    const compactOrderCardStyle = {
        backgroundColor: '#fff',
        borderRadius: '6px',
        padding: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
        border: '1px solid #e9ecef',
        minWidth: window.innerWidth < 768 ? '250px' : 'auto',
        flexShrink: 0
    };

    const renderOrderCard = (order) => (
        <div key={order.id} style={compactOrderCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                    <h4 style={{ margin: '0 0 3px 0', fontSize: window.innerWidth < 768 ? '14px' : '16px', color: '#333' }}>
                        #{order.orderId || order.id}
                    </h4>
                    <div style={{ fontSize: '11px', color: '#666' }}>
                        {formatTime(order.orderDate || order.createdAt)} • {getTimeSinceOrder(order.orderDate || order.createdAt)}
                    </div>
                </div>
                <PriceDisplay amount={order.totalAmount} size="small" />
            </div>

            <div style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                    {order.items?.length || 0} items:
                </div>
                {(order.items || []).slice(0, window.innerWidth < 768 ? 1 : 2).map((item, index) => (
                    <div key={index} style={{ fontSize: '12px', color: '#333', marginBottom: '1px' }}>
                        {item.quantity}x {item.product?.name || item.product?.label}
                    </div>
                ))}
                {order.items?.length > (window.innerWidth < 768 ? 1 : 2) && (
                    <div style={{ fontSize: '11px', color: '#888', fontStyle: 'italic' }}>
                        +{order.items.length - (window.innerWidth < 768 ? 1 : 2)} more
                    </div>
                )}
            </div>

            {/* Status Update Buttons */}
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {getNextPossibleStatuses(order.status).map(status => (
                    <button
                        key={status}
                        onClick={() => handleStatusUpdate(order.id, status)}
                        disabled={updatingOrderId === order.id}
                        style={{
                            backgroundColor: getStatusColor(status),
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: window.innerWidth < 768 ? '4px 8px' : '6px 10px',
                            fontSize: window.innerWidth < 768 ? '10px' : '12px',
                            fontWeight: '500',
                            cursor: updatingOrderId === order.id ? 'not-allowed' : 'pointer',
                            opacity: updatingOrderId === order.id ? 0.6 : 1,
                            transition: 'all 0.2s ease',
                            flex: '1',
                            minWidth: window.innerWidth < 768 ? '60px' : '80px',
                            textAlign: 'center'
                        }}
                    >
                        {updatingOrderId === order.id ? 
                            '⏳' : 
                            window.innerWidth < 768 ? getStatusDisplayName(status).split(' ')[0] : getStatusDisplayName(status)
                        }
                    </button>
                ))}
            </div>
        </div>
    );

    // Loading and error states
    if (ordersLoading && orderHistory.length === 0) {
        return (
            <OuterLayout>
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <div className="spinner"></div>
                    <h3>Loading Kitchen Orders...</h3>
                    <p>Fetching the latest dishes to prepare.</p>
                </div>
            </OuterLayout>
        );
    }

    if (ordersError) {
        return (
            <OuterLayout>
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#dc3545' }}>
                    <h3>Error Loading Orders</h3>
                    <p>Could not fetch kitchen orders: {ordersError}</p>
                    <p>Please ensure the API server is running.</p>
                </div>
            </OuterLayout>
        );
    }

    return (
        <OuterLayout>
            <div style={containerStyle}>
                <div style={headerStyle}>
                    <h1 style={{ margin: 0, color: '#333', fontSize: window.innerWidth < 768 ? '20px' : '28px' }}>
                        🍳 Kitchen Dashboard
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                        <div style={{ 
                            display: 'flex', 
                            gap: window.innerWidth < 768 ? '8px' : '20px', 
                            fontSize: window.innerWidth < 768 ? '12px' : '14px', 
                            color: '#666',
                            flexWrap: 'wrap'
                        }}>
                            <span>🔥 {preparingOrders.length}</span>
                            <span>✅ {readyOrders.length}</span>
                            <span>📦 {deliveredOrders.length}</span>
                            <span>❌ {cancelledOrders.length}</span>
                        </div>
                        <button
                            onClick={() => dispatch(fetchOrders())}
                            disabled={ordersLoading}
                            style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '8px 12px',
                                fontSize: '12px',
                                fontWeight: '500',
                                cursor: ordersLoading ? 'not-allowed' : 'pointer',
                                opacity: ordersLoading ? 0.6 : 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                        >
                            {ordersLoading ? '⏳ Refreshing...' : '🔄 Refresh'}
                        </button>
                    </div>
                </div>

                <div style={kanbanContainerStyle}>
                    {/* PREPARING Column */}
                    <div style={columnStyle}>
                        <div style={columnHeaderStyle('#007bff')}>
                            <span>🔥 PREPARING</span>
                            <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px', fontSize: '12px' }}>
                                {preparingOrders.length}
                            </span>
                        </div>
                        <div style={ordersListStyle}>
                            {preparingOrders.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#999' }}>
                                    <div style={{ fontSize: '3em', marginBottom: '10px' }}>👨‍🍳</div>
                                    <div>No orders being prepared</div>
                                </div>
                            ) : (
                                preparingOrders.map(renderOrderCard)
                            )}
                        </div>
                    </div>

                    {/* READY Column */}
                    <div style={columnStyle}>
                        <div style={columnHeaderStyle('#28a745')}>
                            <span>✅ READY</span>
                            <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px', fontSize: '12px' }}>
                                {readyOrders.length}
                            </span>
                        </div>
                        <div style={ordersListStyle}>
                            {readyOrders.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#999' }}>
                                    <div style={{ fontSize: '3em', marginBottom: '10px' }}>🍽️</div>
                                    <div>No orders ready</div>
                                </div>
                            ) : (
                                readyOrders.map(renderOrderCard)
                            )}
                        </div>
                    </div>

                    {/* DELIVERED Column */}
                    <div style={columnStyle}>
                        <div style={columnHeaderStyle('#6c757d')}>
                            <span>📦 DELIVERED</span>
                            <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px', fontSize: '12px' }}>
                                {deliveredOrders.length}
                            </span>
                        </div>
                        <div style={ordersListStyle}>
                            {deliveredOrders.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#999' }}>
                                    <div style={{ fontSize: '3em', marginBottom: '10px' }}>✅</div>
                                    <div>No delivered orders</div>
                                </div>
                            ) : (
                                deliveredOrders.map(renderOrderCard)
                            )}
                        </div>
                    </div>

                    {/* CANCELLED Column */}
                    <div style={columnStyle}>
                        <div style={columnHeaderStyle('#dc3545')}>
                            <span>❌ CANCELLED</span>
                            <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px', fontSize: '12px' }}>
                                {cancelledOrders.length}
                            </span>
                        </div>
                        <div style={ordersListStyle}>
                            {cancelledOrders.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#999' }}>
                                    <div style={{ fontSize: '3em', marginBottom: '10px' }}>🚫</div>
                                    <div>No cancelled orders</div>
                                </div>
                            ) : (
                                cancelledOrders.map(renderOrderCard)
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </OuterLayout>
    );
};

export default KitchenDisplay;