import React from 'react';
import './PrintableReceipt.css';

const PrintableReceipt = React.forwardRef(({ orderData }, ref) => {
    const {
        orderId,
        items = [],
        totalAmount = 0,
        paymentMethod = 'Card',
        orderDate,
        orderTime,
        customerInfo = { type: 'Walk-in', orderType: 'Dine-in' }
    } = orderData;

    const currentDate = orderDate || new Date().toLocaleDateString();
    const currentTime = orderTime || new Date().toLocaleTimeString();

    return (
        <div ref={ref} className="printable-receipt">
            {/* Header */}
            <div className="receipt-header">
                <h1 className="restaurant-name">Food Truck POS</h1>
                <p className="restaurant-tagline">Delicious Food, Fast Service</p>
                <div className="divider"></div>
            </div>

            {/* Order Info */}
            <div className="receipt-order-info">
                <div className="info-row">
                    <span className="info-label">Order ID:</span>
                    <span className="info-value">{orderId}</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Date:</span>
                    <span className="info-value">{currentDate}</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Time:</span>
                    <span className="info-value">{currentTime}</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Customer:</span>
                    <span className="info-value">{customerInfo.type}</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Order Type:</span>
                    <span className="info-value">{customerInfo.orderType}</span>
                </div>
                <div className="divider"></div>
            </div>

            {/* Items */}
            <div className="receipt-items">
                <div className="items-header">
                    <span className="item-name-header">Item</span>
                    <span className="item-qty-header">Qty</span>
                    <span className="item-price-header">Price</span>
                    <span className="item-total-header">Total</span>
                </div>
                <div className="items-divider"></div>
                
                {items.map((item, index) => (
                    <div key={index} className="receipt-item">
                        <div className="item-main-row">
                            <span className="item-name">
                                {item.product?.name || item.product?.label}
                            </span>
                            <span className="item-qty">×{item.quantity}</span>
                            <span className="item-price">₹{item.product?.price?.toFixed(2)}</span>
                            <span className="item-total">₹{item.totalPrice?.toFixed(2)}</span>
                        </div>
                        
                        {/* Customizations */}
                        {item.customizations && item.customizations.length > 0 && (
                            <div className="item-customizations">
                                {item.customizations.map((custom, customIndex) => (
                                    <div key={customIndex} className="customization-row">
                                        <span className="customization-name">
                                            + {custom.label}
                                        </span>
                                        <span className="customization-qty">×{item.quantity}</span>
                                        <span className="customization-price">₹{custom.price?.toFixed(2)}</span>
                                        <span className="customization-total">₹{(custom.price * item.quantity)?.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                
                <div className="items-divider"></div>
            </div>

            {/* Totals */}
            <div className="receipt-totals">
                <div className="subtotal-row">
                    <span className="total-label">Subtotal:</span>
                    <span className="total-value">₹{totalAmount?.toFixed(2)}</span>
                </div>
                <div className="tax-row">
                    <span className="total-label">Tax (0%):</span>
                    <span className="total-value">₹0.00</span>
                </div>
                <div className="grand-total-row">
                    <span className="grand-total-label">TOTAL:</span>
                    <span className="grand-total-value">₹{totalAmount?.toFixed(2)}</span>
                </div>
                <div className="divider"></div>
            </div>

            {/* Payment Info */}
            <div className="receipt-payment">
                <div className="info-row">
                    <span className="info-label">Payment Method:</span>
                    <span className="info-value">{paymentMethod}</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Status:</span>
                    <span className="info-value payment-success">PAID</span>
                </div>
                <div className="divider"></div>
            </div>

            {/* Footer */}
            <div className="receipt-footer">
                <p className="thank-you">Thank you for your order!</p>
                <p className="contact-info">📞 (555) 123-4567 | 📧 orders@foodtruckpos.com</p>
                <p className="return-policy">
                    Items can be returned within 30 minutes of purchase
                </p>
                <div className="receipt-bottom">
                    <p className="powered-by">Powered by Food Truck POS System</p>
                    <p className="print-time">
                        Printed: {new Date().toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
});

PrintableReceipt.displayName = 'PrintableReceipt';

export default PrintableReceipt;
