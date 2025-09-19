import React from 'react';
import './productPrice.css';

const ProductPrice = ({ itemsList, onChange }) => {
    return (

        <div class="menu">
            <span class="menu-header">Label</span>
            <span class="menu-header">Quantity</span>
            <span class="menu-header">Total</span>
            {
                itemsList.map(item => (
                    <>
                        <span className="menu-item text-overflow">{`(₹${item?.price})${item?.label}`}</span>
                        <input placeholder='Quantity' type='number' />
                        <span>{`₹${item?.total}`}</span>
                    </>
                ))
            }
        </div>
    );
}


export default ProductPrice;