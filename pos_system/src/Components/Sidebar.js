import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import pages from '../Pages/Constants.js';

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

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
                        onClick={() => handleNavigation('/cart')}
                    >
                        Cart
                    </button>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
