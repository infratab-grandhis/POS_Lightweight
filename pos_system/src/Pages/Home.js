import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OuterLayout from '../Layouts/OuterLayout.js';
import Button from '../Components/common/Button';
import PriceDisplay from '../Components/common/PriceDisplay';
import pages from './Constants.js';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.orderReducer.cart);
    const orderHistory = useSelector(state => state.orderReducer.orderHistory);
    
    const cartCount = cartItems.length;
    const totalOrdersCount = orderHistory.length;
    const cartTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    const navigateToProducts = () => {
        navigate(pages.products);
    };

    const navigateToCart = () => {
        navigate(pages.cart);
    };

    const navigateToOrderHistory = () => {
        navigate(pages.orderHistory);
    };

    const navigateToKitchen = () => {
        navigate(pages.kitchen);
    };

    return (
        <OuterLayout>
            <div className="home-container">
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">🍕 Food Truck POS</h1>
                        <p className="hero-subtitle">
                            Quick & Easy Point of Sale System
                        </p>
                        <p className="hero-description">
                            Order delicious food, manage your cart, and track your order history - all in one place!
                        </p>
                        
                        <div className="hero-actions">
                            <Button 
                                variant="primary" 
                                size="large" 
                                onClick={navigateToProducts}
                                className="hero-primary-btn"
                            >
                                🛒 Start Ordering
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Quick Stats */}
                <section className="stats-section">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">🛍️</div>
                            <div className="stat-info">
                                <h3>{cartCount}</h3>
                                <p>Items in Cart</p>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon">📋</div>
                            <div className="stat-info">
                                <h3>{totalOrdersCount}</h3>
                                <p>Total Orders</p>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon">💰</div>
                            <div className="stat-info">
                                <h3>
                                    {cartTotal > 0 ? <PriceDisplay amount={cartTotal} size="small" /> : '₹0.00'}
                                </h3>
                                <p>Cart Total</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Actions */}
                <section className="actions-section">
                    <h2 className="section-title">Quick Actions</h2>
                    <div className="actions-grid">
                        {/* Browse Products Card */}
                        <div className="action-card" onClick={navigateToProducts}>
                            <div className="action-icon">🍽️</div>
                            <div className="action-content">
                                <h3>Browse Menu</h3>
                                <p>Explore our delicious food items and add them to your cart</p>
                            </div>
                            <div className="action-arrow">→</div>
                        </div>

                        {/* View Cart Card */}
                        <div className="action-card" onClick={navigateToCart}>
                            <div className="action-icon">🛒</div>
                            <div className="action-content">
                                <h3>My Cart</h3>
                                <p>
                                    {cartCount > 0 
                                        ? `Review ${cartCount} item${cartCount > 1 ? 's' : ''} and checkout`
                                        : 'Your cart is empty'
                                    }
                                </p>
                            </div>
                            <div className="action-arrow">→</div>
                        </div>

                        {/* Order History Card */}
                        <div className="action-card" onClick={navigateToOrderHistory}>
                            <div className="action-icon">📋</div>
                            <div className="action-content">
                                <h3>Order History</h3>
                                <p>
                                    {totalOrdersCount > 0 
                                        ? `View your ${totalOrdersCount} completed order${totalOrdersCount > 1 ? 's' : ''}`
                                        : 'No orders yet'
                                    }
                                </p>
                            </div>
                            <div className="action-arrow">→</div>
                        </div>

                        {/* Kitchen Display Card */}
                        <div className="action-card" onClick={navigateToKitchen}>
                            <div className="action-icon">🍳</div>
                            <div className="action-content">
                                <h3>Kitchen Display</h3>
                                <p>Manage orders, update status, and track preparation progress</p>
                            </div>
                            <div className="action-arrow">→</div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <h2 className="section-title">Why Choose Our POS?</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon">⚡</div>
                            <h4>Fast & Easy</h4>
                            <p>Quick ordering process with intuitive interface</p>
                        </div>
                        
                        <div className="feature-item">
                            <div className="feature-icon">📱</div>
                            <h4>Mobile Friendly</h4>
                            <p>Works perfectly on tablets and mobile devices</p>
                        </div>
                        
                        <div className="feature-item">
                            <div className="feature-icon">💾</div>
                            <h4>Order History</h4>
                            <p>Keep track of all your completed orders</p>
                        </div>
                        
                        <div className="feature-item">
                            <div className="feature-icon">🎨</div>
                            <h4>User Friendly</h4>
                            <p>Clean, modern design that's easy to use</p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="home-footer">
                    <p>Ready to start? 
                        <Button 
                            variant="primary" 
                            size="medium" 
                            onClick={navigateToProducts}
                            className="footer-btn"
                        >
                            Browse Menu
                        </Button>
                    </p>
                </footer>
            </div>
        </OuterLayout>
    );
};

export default Home;