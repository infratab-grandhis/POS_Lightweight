import React from 'react';
import { getStatusColor, getStatusDisplayName } from '../../utils/orderStatusMachine';

const OrderStatusBadge = ({ status, size = 'medium' }) => {
    const color = getStatusColor(status);
    const displayName = getStatusDisplayName(status);
    
    const sizeStyles = {
        small: { padding: '2px 6px', fontSize: '11px' },
        medium: { padding: '4px 8px', fontSize: '12px' },
        large: { padding: '6px 12px', fontSize: '14px' }
    };
    
    const style = {
        display: 'inline-block',
        backgroundColor: color,
        color: 'white',
        borderRadius: '12px',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        ...sizeStyles[size]
    };
    
    return (
        <span style={style}>
            {displayName}
        </span>
    );
};

export default OrderStatusBadge;
