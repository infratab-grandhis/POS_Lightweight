import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showSuccessNotification, showErrorNotification } from '../Redux/Notification/actions';
import './NetworkStatus.css';

const NetworkStatus = ({ compact = false }) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showDetails, setShowDetails] = useState(false);
    const dispatch = useDispatch();
    
    const cartItems = useSelector(state => state.orderReducer.cart || []);
    const orderHistory = useSelector(state => state.orderReducer.orderHistory || []);
    const inventory = useSelector(state => state.orderReducer.inventory || []);
    
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const handleClearPersistentData = () => {
        if (window.confirm('Clear all stored data? This will reset the app and clear your cart.')) {
            try {
                localStorage.removeItem('persist:root');
                sessionStorage.clear();
                dispatch(showSuccessNotification(
                    'All data cleared successfully! Page will reload in 2 seconds.',
                    { title: 'Data Cleared', duration: 2000 }
                ));
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } catch (error) {
                console.error('Failed to clear data:', error);
                dispatch(showErrorNotification(
                    `Failed to clear data: ${error.message}`,
                    { title: 'Clear Failed' }
                ));
            }
        }
    };

    // Compact version for navbar
    if (compact) {
        return (
            <div className={`network-status-compact ${isOnline ? 'online' : 'offline'}`}>
                <button 
                    className="status-indicator-compact"
                    onClick={() => setShowDetails(!showDetails)}
                    title={`Network: ${isOnline ? 'Online' : 'Offline'} - Click for details`}
                >
                    <span className={`status-dot-compact ${isOnline ? 'online' : 'offline'}`}></span>
                </button>

                {showDetails && (
                    <div className="status-dropdown">
                        <div className="dropdown-arrow"></div>
                        <div className="status-content">
                            <div className="status-header">
                                <span className={`status-text ${isOnline ? 'online' : 'offline'}`}>
                                    {isOnline ? '🟢 Online' : '🔴 Offline'}
                                </span>
                            </div>
                            
                            <div className="status-details-compact">
                                <div className="status-row">
                                    <span>Cart Items:</span>
                                    <span>{cartItems.length}</span>
                                </div>
                                <div className="status-row">
                                    <span>Orders:</span>
                                    <span>{orderHistory.length}</span>
                                </div>
                                <div className="status-row">
                                    <span>Inventory:</span>
                                    <span>{inventory.length}</span>
                                </div>
                            </div>

                            <div className="status-actions-compact">
                                <button
                                    onClick={handleClearPersistentData}
                                    className="clear-btn-compact"
                                >
                                    🗑️ Clear Data
                                </button>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="refresh-btn-compact"
                                >
                                    🔄 Refresh
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Full version (for standalone use if needed)
    return (
        <div className={`network-status-full ${isOnline ? 'online' : 'offline'}`}>
            <div className="status-indicator-full" onClick={() => setShowDetails(!showDetails)}>
                <span className="status-dot-full"></span>
                <span className="status-text">
                    {isOnline ? '🟢 Online' : '🔴 Offline'}
                </span>
                <span className="expand-icon">{showDetails ? '▼' : '▶'}</span>
            </div>

            {showDetails && (
                <div className="status-details-full">
                    <div className="status-section">
                        <h4>Network Status</h4>
                        <p>Connection: {isOnline ? 'Online' : 'Offline'}</p>
                        <p>Redux Persist: ✅ Enabled</p>
                        <p>Data auto-saves to localStorage</p>
                    </div>

                    <div className="status-section">
                        <h4>Local Storage Stats</h4>
                        <div className="sync-stats">
                            <p>Cart Items: {cartItems.length}</p>
                            <p>Order History: {orderHistory.length}</p>
                            <p>Inventory Items: {inventory.length}</p>
                        </div>
                    </div>

                    <div className="status-actions">
                        <button
                            onClick={handleClearPersistentData}
                            className="clear-btn"
                        >
                            🗑️ Clear Data
                        </button>

                        <button
                            onClick={() => window.location.reload()}
                            className="refresh-btn"
                        >
                            🔄 Refresh App
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NetworkStatus;
