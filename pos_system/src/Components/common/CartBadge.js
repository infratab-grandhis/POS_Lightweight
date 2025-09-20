import React from 'react';
import './CartBadge.css';

const CartBadge = ({ 
  count, 
  size = 'medium',
  className = ''
}) => {
  if (count <= 0) return null;

  return (
    <span className={`cart-badge cart-badge-${size} ${className}`}>
      {count > 99 ? '99+' : count}
    </span>
  );
};

export default CartBadge;
