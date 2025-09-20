import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity, clearCart } from '../Redux/Order/action';
import OuterLayout from '../Layouts/OuterLayout';
import './Cart.css';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.orderReducer.cart);
    
    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    const handleRemoveItem = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateCartQuantity(itemId, newQuantity));
        }
    };

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear the cart?')) {
            dispatch(clearCart());
        }
    };

    if (cartItems.length === 0) {
        return (
            <OuterLayout>
                <div className="cart-container">
                    <div className="empty-cart">
                        <div className="empty-cart-icon">🛒</div>
                        <h2>Your cart is empty</h2>
                        <p>Add some delicious items to get started!</p>
                        <button 
                            className="continue-shopping-btn"
                            onClick={() => window.history.back()}
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </OuterLayout>
        );
    }

    return (
        <OuterLayout>
            <div className="cart-container">
                <div className="cart-header">
                    <h2>Your Cart ({cartItems.length} items)</h2>
                    <button onClick={handleClearCart} className="clear-cart-btn">
                        Clear All
                    </button>
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
                                <p className="base-price">₹{item.product.price}</p>
                                
                                {item.customizations.length > 0 && (
                                    <div className="customizations">
                                        <span>Add-ons: </span>
                                        {item.customizations.map(custom => custom.label).join(', ')}
                                    </div>
                                )}
                            </div>

                            <div className="item-controls">
                                <div className="quantity-controls">
                                    <button 
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        className="quantity-btn"
                                    >
                                        -
                                    </button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button 
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        className="quantity-btn"
                                    >
                                        +
                                    </button>
                                </div>
                                
                                <div className="item-total">
                                    ₹{item.totalPrice.toFixed(2)}
                                </div>
                                
                                <button 
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="remove-btn"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <div className="total-line">
                        <span className="total-label">Total:</span>
                        <span className="total-amount">₹{total.toFixed(2)}</span>
                    </div>
                    
                    <button className="checkout-btn">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </OuterLayout>
    );
};

export default Cart;
