import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Layout.css';
import Sidebar from '../Components/Sidebar';
import CartBadge from '../Components/common/CartBadge';
import NetworkStatus from '../Components/NetworkStatus';
 
const OuterLayout = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    
    // Get cart items from Redux store
    const cartItems = useSelector(state => state.orderReducer.cart);
    const cartCount = cartItems.length;

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    return (
        <div className='layout'>
            <nav className="navbar">
                {/* Left: Hamburger Menu */}
                <div className="navbar-left">
                    <button className="hamburger-menu" onClick={toggleSidebar}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                {/* Center: Title */}
                <div className="navbar-center">
                    <h3 className="navbar-title">Food-Truck-Pos</h3>
                </div>

                {/* Right: Network Status + Cart Symbol */}
                <div className="navbar-right">
                    {/* Network Status - Always visible */}
                    <NetworkStatus compact={true} />
                    
                    {/* Cart Symbol - Only visible when cart has items */}
                    {cartCount > 0 && (
                        <button className="cart-button" onClick={handleCartClick}>
                            <div className="cart-icon">
                                🛒
                                <CartBadge count={cartCount} size="medium" />
                            </div>
                        </button>
                    )}
                </div>
            </nav>
            <main>
                {props.children}
            </main>
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        </div>
    );
}
  
export default OuterLayout;