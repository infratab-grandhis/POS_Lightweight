import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProductPrice from './ProductPrice';
import { transformProductInfo } from '../utils';
import { addToCart } from '../Redux/Order/action';

const Product = ({ product }) => {
    const dispatch = useDispatch();
    const [expand, setExpansStatus] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedCustomizations, setSelectedCustomizations] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const itemsList = transformProductInfo([product]);
        setItems(itemsList);
    }, [product]);

    const toggleProductInfoContent = () => {
        setExpansStatus(prevStatus => !prevStatus);
    }

    const handleAddToCart = () => {
        // Get main product (isMainIngredient: true)
        const mainProduct = items.find(item => item.isMainIngredient);
        if (mainProduct) {
            dispatch(addToCart(product, quantity, selectedCustomizations));
            // Reset form
            setSelectedCustomizations([]);
            setQuantity(1);
            setExpansStatus(false);
        }
    }

    const handleCustomizationChange = (customization, isSelected) => {
        if (isSelected) {
            setSelectedCustomizations(prev => [...prev, customization]);
        } else {
            setSelectedCustomizations(prev => prev.filter(custom => custom.id !== customization.id));
        }
    }

    return (
        <section className='product-container'>
            <img className='product-image' src={product?.image} alt={product?.name} onClick={toggleProductInfoContent} />
            {
                expand && (
                    <section className='product-info'>
                        <ProductPrice 
                            itemsList={items} 
                            quantity={quantity}
                            onQuantityChange={setQuantity}
                            selectedCustomizations={selectedCustomizations}
                            onCustomizationChange={handleCustomizationChange}
                        />
                        <button className='button-primary' onClick={handleAddToCart}>
                            ADD TO CART
                        </button>
                    </section>
                )
            }
        </section>
    );
}

Product.propTypes = {};

export default Product;