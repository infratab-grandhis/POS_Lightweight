import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OuterLayout from '../Layouts/OuterLayout';
import Button from '../Components/common/Button';
import EmptyState from '../Components/common/EmptyState';
import PriceDisplay from '../Components/common/PriceDisplay';
import { clearOrderHistory } from '../Redux/Order/action';
import './OrderHistory.css';

const OrderHistory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderHistory = useSelector(state => state.orderReducer.orderHistory);

    const handleClearHistory = () => {
        if (window.confirm('Are you sure you want to clear all order history?')) {
            dispatch(clearOrderHistory());
        }
    };

    const handleBackToProducts = () => {
        navigate('/products');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (orderHistory.length === 0) {
        return (
            <OuterLayout>
                <div className="order-history-container">
                    <EmptyState
                        icon="📋"
                        title="No Orders Yet"
                        message="Your completed orders will appear here"
                        actionText="Start Shopping"
                        onAction={handleBackToProducts}
                    />
                </div>
            </OuterLayout>
        );
    }

    return (
        <OuterLayout>
            <div className="order-history-container">
                <div className="order-history-header">
                    <h2>Order History ({orderHistory.length})</h2>
                    <div className="header-actions">
                        <Button onClick={handleClearHistory} variant="danger" size="small">
                            Clear History
                        </Button>
                        <Button onClick={handleBackToProducts} variant="primary" size="small">
                            Continue Shopping
                        </Button>
                    </div>
                </div>

                <div className="orders-list">
                    {orderHistory.map(order => (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                <div className="order-info">
                                    <h3 className="order-id">{order.orderId}</h3>
                                    <div className="order-meta">
                                        <span className="order-date">{formatDate(order.orderDate)}</span>
                                        <span className="order-time">{order.orderTime}</span>
                                        <span className={`order-status status-${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="order-total">
                                    <PriceDisplay amount={order.totalAmount} size="large" />
                                </div>
                            </div>

                            <div className="order-details">
                                <div className="payment-info">
                                    <span className="payment-method">
                                        💳 {order.paymentMethod} • {order.customerInfo.orderType}
                                    </span>
                                </div>
                                
                                <div className="order-items">
                                    <h4>Items ({order.items.length})</h4>
                                    {order.items.map(item => (
                                        <div key={item.id} className="order-item">
                                            <div className="item-info">
                                                <span className="item-name">{item.product.name || item.product.label}</span>
                                                <span className="item-quantity">x{item.quantity}</span>
                                            </div>
                                            <div className="item-details">
                                                <PriceDisplay amount={item.totalPrice} size="small" />
                                                {item.customizations.length > 0 && (
                                                    <div className="item-customizations">
                                                        Add-ons: {item.customizations.map(custom => custom.label).join(', ')}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </OuterLayout>
    );
};

export default OrderHistory;
