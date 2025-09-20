import React from 'react';
import PriceDisplay from './common/PriceDisplay';
import './productPrice.css';

const ProductPrice = ({ itemsList, quantity, onQuantityChange, selectedCustomizations, onCustomizationChange }) => {
    // Calculate dynamic totals based on current quantity and customizations
    const calculateItemTotal = (item) => {
        const qty = parseFloat(quantity) || 0;
        
        if (item?.isMainIngredient) {
            // Main product total = base price * quantity
            return (item?.price || 0) * qty;
        } else {
            // Customization total = customization price * quantity (if selected)
            const isSelected = selectedCustomizations.some(custom => custom.id === item.id);
            return isSelected ? (item?.price || 0) * qty : 0;
        }
    };

    // Calculate grand total
    const grandTotal = itemsList.reduce((total, item) => total + calculateItemTotal(item), 0);

    return (
        <div className="menu">
            <span className="menu-header">Label</span>
            <span className="menu-header">Quantity</span>
            <span className="menu-header">Total</span>
            {
                itemsList.map(item => (
                    <React.Fragment key={item?.id}>
                        <div className="menu-item-container">
                            <div className="item-name-row">
                                <span className="item-price">
                                    (<PriceDisplay amount={item?.price} size="small" />)
                                </span>
                                <span className="item-label">{item?.label}</span>
                            </div>
                            {item?.isMainIngredient && (
                                <div className="badge-row">
                                    <span className="main-ingredient-badge">Main Item</span>
                                </div>
                            )}
                        </div>
                        {item?.isMainIngredient ? (
                            <div className="temp-quantity-controls">
                                <button 
                                    onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >-</button>
                                <span>{quantity}</span>
                                <button 
                                    onClick={() => onQuantityChange(quantity + 1)}
                                >+</button>
                            </div>
                        ) : (
                            <div className="customization-controls">
                                <input
                                    type="checkbox"
                                    checked={selectedCustomizations.some(custom => custom.id === item.id)}
                                    onChange={(e) => onCustomizationChange(item, e.target.checked)}
                                    className="customization-checkbox"
                                />
                            </div>
                        )}
                        <span className="item-total">
                            <PriceDisplay amount={calculateItemTotal(item)} size="medium" />
                        </span>
                    </React.Fragment>
                ))
            }
            {/* Grand Total Row */}
            <div className="grand-total-row">
                <span className="grand-total-label">Grand Total:</span>
                <span></span>
                <span className="grand-total-amount">
                    <PriceDisplay amount={grandTotal} size="large" />
                </span>
            </div>
        </div>
    );
}


export default ProductPrice;