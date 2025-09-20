import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../../Redux/Notification/actions';
import './NotificationSystem.css';

const NotificationSystem = () => {
    const notifications = useSelector(state => state.notificationReducer?.notifications || []);
    const dispatch = useDispatch();

    const handleClose = (id) => {
        dispatch(removeNotification(id));
    };

    if (notifications.length === 0) return null;

    return (
        <div className="notification-container">
            {notifications.map((notification) => (
                <Toast 
                    key={notification.id}
                    notification={notification}
                    onClose={() => handleClose(notification.id)}
                />
            ))}
        </div>
    );
};

const Toast = ({ notification, onClose }) => {
    const { type, title, message, duration, persistent } = notification;

    React.useEffect(() => {
        if (!persistent && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [persistent, duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            default: return 'ℹ️';
        }
    };

    return (
        <div 
            className={`toast toast-${type}`}
            role="alert"
            aria-live={type === 'error' ? 'assertive' : 'polite'}
        >
            <div className="toast-content">
                <div className="toast-icon">
                    {getIcon()}
                </div>
                <div className="toast-message">
                    {title && <div className="toast-title">{title}</div>}
                    <div className="toast-text">{message}</div>
                </div>
            </div>
            
            <button 
                className="toast-close"
                onClick={onClose}
                aria-label="Close notification"
            >
                ×
            </button>
        </div>
    );
};

export default NotificationSystem;
