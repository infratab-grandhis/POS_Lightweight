import React, { useEffect, useState } from 'react';
import ProductPrice from './ProductPrice';
import { transformProductInfo } from '../utils';

const Product = ({ product }) => {
    const [expand, setExpansStatus] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const itemsList = transformProductInfo([product]);
        setItems(itemsList);
    }, [product]);

    const toggleProductInfoContent = () => {
        setExpansStatus(prevStatus => !prevStatus);
    }

    return (
        <section className='product-container'>
            <img className='product-image' src={product?.image} alt={product?.name} onClick={toggleProductInfoContent} />
            {
                expand && (
                    <section className='product-info'>
                        <ProductPrice itemsList={items} />
                        <button className='button-primary'>ADD</button>
                    </section>
                )
            }
        </section>
    );
}

Product.propTypes = {};

export default Product;