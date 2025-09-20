import React from 'react';
import './productPrice.css';

const ProductPrice = ({ itemsList, quantity, onQuantityChange, selectedCustomizations, onCustomizationChange }) => {
    return (
        <div className="menu">
            <span className="menu-header">Label</span>
            <span className="menu-header">Quantity</span>
            <span className="menu-header">Total</span>
            {
                itemsList.map(item => (
                    <React.Fragment key={item?.id}>
                        <span className="menu-item text-overflow">
                            {`(₹${item?.price})${item?.label}`}
                            {item?.isMainIngredient && <span className="main-ingredient-badge">Main</span>}
                        </span>
                        {item?.isMainIngredient ? (
                            <input 
                                placeholder='Quantity' 
                                type='number'
                                value={quantity}
                                onChange={(e) => onQuantityChange(e.target.value)}
                                className="quantity-input"
                            />
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
                        <span>{`₹${item?.total || item?.price}`}</span>
                    </React.Fragment>
                ))
            }
        </div>
    );
}


export default ProductPrice;