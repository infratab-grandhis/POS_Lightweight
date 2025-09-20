import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Sidebar.css';
import pages from '../Pages/Constants.js';

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.orderReducer.cart);
    const cartCount = cartItems.length;

    const handleNavigation = (path) => {
        navigate(path);
        onClose(); // Close sidebar after navigation
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-header">
                    <h3 className='m-0'>Food-Truck-Pos</h3>
                    <button className="sidebar-close" onClick={onClose}>×</button>
                </div>
                <nav className="sidebar-nav">
                    <button
                        className="sidebar-item"
                        onClick={() => handleNavigation(pages.home)}
                    >
                        Home
                    </button>
                    <button
                        className="sidebar-item"
                        onClick={() => handleNavigation(pages.products)}
                    >
                        Products
                    </button>
                    <button
                        className="sidebar-item"
                        onClick={() => handleNavigation(pages.cart)}
                    >
                        🛒 Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </button>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
