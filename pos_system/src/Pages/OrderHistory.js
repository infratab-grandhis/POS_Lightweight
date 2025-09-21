import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import OuterLayout from '../Layouts/OuterLayout';
import Button from '../Components/common/Button';
import EmptyState from '../Components/common/EmptyState';
import PriceDisplay from '../Components/common/PriceDisplay';
import PrintableReceipt from '../Components/PrintableReceipt';
import OrderStatusBadge from '../Components/OrderStatus/OrderStatusBadge';
import { clearOrderHistory } from '../Redux/Order/action';
import { showSuccessNotification, showErrorNotification } from '../Redux/Notification/actions';
import './OrderHistory.css';
import pages from './Constants'

const OrderHistory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderHistory = useSelector(state => state.orderReducer.orderHistory);
    
    // Print functionality
    const printRef = useRef();
    const [printOrderData, setPrintOrderData] = useState(null);

    const handleClearHistory = () => {
        if (window.confirm('Are you sure you want to clear all order history?')) {
            dispatch(clearOrderHistory());
        }
    };

    const handleBackToProducts = () => {
        navigate(pages.products);
    };

    // Print functionality
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Receipt-${printOrderData?.orderId || Date.now()}`,
        onBeforePrint: () => Promise.resolve(),
        onAfterPrint: () => {
            dispatch(showSuccessNotification('Receipt printed successfully!'));
            setPrintOrderData(null);
        },
        onPrintError: (errorLocation, error) => {
            dispatch(showErrorNotification('Unable to print receipt. Please try again.', { title: 'Print Failed' }));
            setPrintOrderData(null);
        },
        pageStyle: `
            @page {
                size: 80mm auto;
                margin: 2mm;
            }
        `
    });

    const handlePrintOrder = (order) => {
        // Convert order format to receipt format
        const receiptData = {
            orderId: order.id,
            items: order.items,
            totalAmount: order.total,
            paymentMethod: 'Card',
            orderDate: order.date,
            orderTime: order.time,
            customerInfo: {
                type: 'Walk-in',
                orderType: 'Dine-in'
            }
        };
        
        setPrintOrderData(receiptData);
        
        // Wait for component to render with data, then print
        setTimeout(() => {
            if (printRef.current) {
                handlePrint();
            } else {
                dispatch(showErrorNotification('Unable to prepare receipt for printing.'));
            }
        }, 100);
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
                                        <OrderStatusBadge status={order.status} size="small" />
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
                                
                                <div className="order-actions" style={{marginTop: '12px', display: 'flex', gap: '8px'}}>
                                    <Button 
                                        variant="primary" 
                                        size="small"
                                        onClick={() => handlePrintOrder(order)}
                                    >
                                        🖨️ Print Receipt
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hidden Receipt Component for Printing */}
            <div style={{ 
                position: 'absolute', 
                left: '-9999px', 
                top: '-9999px',
                width: '300px',
                opacity: 0,
                pointerEvents: 'none'
            }}>
                {printOrderData && (
                    <PrintableReceipt 
                        ref={printRef} 
                        orderData={printOrderData}
                    />
                )}
            </div>
        </OuterLayout>
    );
};

export default OrderHistory;
