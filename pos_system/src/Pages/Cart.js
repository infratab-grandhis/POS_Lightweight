import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateCartQuantity, clearCart, addToOrderHistory } from '../Redux/Order/action';
import Button from '../Components/common/Button';
import EmptyState from '../Components/common/EmptyState';
import PriceDisplay from '../Components/common/PriceDisplay';
import OuterLayout from '../Layouts/OuterLayout';
import './Cart.css';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.orderReducer.cart);
    const inventory = useSelector(state => state.orderReducer.inventory);
    
    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    const handleRemoveItem = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity <= 0) return;
        
        const cartItem = cartItems.find(item => item.id === itemId);
        if (!cartItem) return;
        
        const productInventory = inventory.find(inv => inv.productId === cartItem.productId);
        if (!productInventory) return;
        
        // Calculate available stock (current inventory + quantity already in cart)
        const availableStock = productInventory.available + cartItem.quantity;
        
        if (newQuantity > availableStock) {
            alert(`❌ Cannot add more! Only ${availableStock} ${productInventory.unit} available in stock.`);
            return;
        }
        
        dispatch(updateCartQuantity(itemId, newQuantity));
    };

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear the cart?')) {
            dispatch(clearCart());
        }
    };

    const handleProceedToCheckout = () => {
        // Print order details to console (simulating printing)
        console.log('=== ORDER RECEIPT ===');
        console.log(`Order ID: ORD-${Date.now()}`);
        console.log(`Date: ${new Date().toLocaleString()}`);
        console.log('Items:');
        cartItems.forEach(item => {
            console.log(`- ${item.product.name || item.product.label} x${item.quantity} = ₹${item.totalPrice.toFixed(2)}`);
            if (item.customizations.length > 0) {
                console.log(`  Add-ons: ${item.customizations.map(c => c.label).join(', ')}`);
            }
        });
        console.log(`Total: ₹${total.toFixed(2)}`);
        console.log('Payment: Completed');
        console.log('=====================');

        // Show success message
        alert(`Order completed successfully!\nTotal: ₹${total.toFixed(2)}\nCheck console for receipt details.`);
        
        // Add to order history
        dispatch(addToOrderHistory(cartItems, total));
        
        // Navigate to order history
        navigate('/order-history');
    };

    if (cartItems.length === 0) {
        return (
            <OuterLayout>
                <div className="cart-container">
                    <EmptyState
                        icon="🛒"
                        title="Your cart is empty"
                        message="Add some delicious items to get started!"
                        actionText="Continue Shopping"
                        onAction={() => window.history.back()}
                    />
                </div>
            </OuterLayout>
        );
    }

    return (
        <OuterLayout>
            <div className="cart-container">
                <div className="cart-header">
                    <h2>Your Cart ({cartItems.length} items)</h2>
                    <Button onClick={handleClearCart} variant="danger" size="small">
                        Clear All
                    </Button>
                </div>

                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="item-image">
                                <img 
                                    src={item.product.image || '/placeholder-product.jpg'} 
                                    alt={item.product.name} 
                                />
                            </div>
                            
                            <div className="item-details">
                                <h3>{item.product.name || item.product.label}</h3>
                                <p className="base-price">
                                    <PriceDisplay amount={item.product.price} size="small" />
                                </p>
                                
                                {item.customizations.length > 0 && (
                                    <div className="customizations">
                                        <span>Add-ons: </span>
                                        {item.customizations.map(custom => custom.label).join(', ')}
                                    </div>
                                )}
                            </div>

                            <div className="item-controls">
                                <div className="temp-quantity-controls">
                                    <button 
                                        onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                                        disabled={item.quantity <= 1}
                                    >-</button>
                                    <span>{item.quantity}</span>
                                    <button 
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    >+</button>
                                </div>
                                
                                <div className="item-total">
                                    <PriceDisplay amount={item.totalPrice} size="large" />
                                </div>
                                
                                <Button 
                                    onClick={() => handleRemoveItem(item.id)}
                                    variant="danger"
                                    size="small"
                                >
                                    🗑️
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <div className="total-line">
                        <span className="total-label">Total:</span>
                        <span className="total-amount">
                            <PriceDisplay amount={total} size="large" />
                        </span>
                    </div>
                    
                    <Button variant="primary" size="large" onClick={handleProceedToCheckout}>
                        Proceed to Checkout
                    </Button>
                </div>
            </div>
        </OuterLayout>
    );
};

export default Cart;
