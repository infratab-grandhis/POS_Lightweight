import React from 'react';
import './PriceDisplay.css';

const PriceDisplay = ({ 
  amount, 
  currency = '₹',
  size = 'medium',
  className = ''
}) => {
  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : '0.00';
  };

  return (
    <span className={`price-display price-${size} ${className}`}>
      {currency}{formatPrice(amount)}
    </span>
  );
};

export default PriceDisplay;
