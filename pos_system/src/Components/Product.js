import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductPrice from './ProductPrice';
import { transformProductInfo } from '../utils';
import { addToCartWithInventoryCheck } from '../Redux/Order/action';
import Button from './common/Button';

const Product = ({ product }) => {
    const dispatch = useDispatch();
    const inventory = useSelector(state => state.orderReducer.inventory);
    const [expand, setExpansStatus] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedCustomizations, setSelectedCustomizations] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Get product inventory
    const productInventory = inventory.find(inv => inv.productId === product.id);
    const availableStock = productInventory ? productInventory.available : 0;
    const isOutOfStock = availableStock === 0;
    const isLowStock = availableStock <= 5 && availableStock > 0;

    useEffect(() => {
        const itemsList = transformProductInfo([product]);
        setItems(itemsList);
    }, [product]);

    const toggleProductInfoContent = () => {
        setExpansStatus(prevStatus => !prevStatus);
    }

    const handleAddToCart = async () => {
        // Clear previous errors
        setError('');
        setIsLoading(true);
        
        try {
            // Validate stock before adding
            if (quantity > availableStock) {
                throw new Error(`Only ${availableStock} ${productInventory?.unit || 'items'} available!`);
            }
            // Get main product (isMainIngredient: true)
            const mainProduct = items.find(item => item.isMainIngredient);
            if (mainProduct) {
                await dispatch(addToCartWithInventoryCheck(product, quantity, selectedCustomizations));
                // Reset form
                setSelectedCustomizations([]);
                setQuantity(1);
                setExpansStatus(false);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCustomizationChange = (customization, isSelected) => {
        if (isSelected) {
            setSelectedCustomizations(prev => [...prev, customization]);
        } else {
            setSelectedCustomizations(prev => prev.filter(custom => custom.id !== customization.id));
        }
    }

    return (
        <section className={`product-container ${isOutOfStock ? 'out-of-stock' : ''}`}>
            {/* Product Image with Inventory Badge */}
            <div className="product-image-wrapper" onClick={toggleProductInfoContent}>
                <img className='product-image' src={product?.image} alt={product?.name} />
                
                {/* Inventory Status Badge */}
                <div className="inventory-badge">
                    {isOutOfStock ? (
                        <span className="badge out-of-stock-badge">Out of Stock</span>
                    ) : isLowStock ? (
                        <span className="badge low-stock-badge">Low Stock ({availableStock})</span>
                    ) : (
                        <span className="badge in-stock-badge">In Stock ({availableStock})</span>
                    )}
                </div>
                
                {isOutOfStock && (
                    <div className="out-of-stock-overlay">
                        <span>Out of Stock</span>
                    </div>
                )}
            </div>

            {/* Product Name and Basic Info */}
            <div className="product-basic-info">
                <h3 className="product-name">{product?.name || product?.label}</h3>
                <p className="product-stock-info">
                    {productInventory ? (
                        `${availableStock} ${productInventory.unit} available`
                    ) : (
                        'Stock information not available'
                    )}
                </p>
            </div>

            {expand && !isOutOfStock && (
                <section className='product-info'>
                    {error && (
                        <div className="error-message">
                            ⚠️ {error}
                        </div>
                    )}
                    
                    <ProductPrice 
                        itemsList={items} 
                        quantity={quantity}
                        onQuantityChange={setQuantity}
                        selectedCustomizations={selectedCustomizations}
                        onCustomizationChange={handleCustomizationChange}
                        maxQuantity={availableStock}
                    />
                    
                    <Button 
                        variant="primary" 
                        onClick={handleAddToCart}
                        disabled={isLoading || quantity > availableStock || isOutOfStock}
                    >
                        {isLoading ? 'Adding...' : 'ADD TO CART'}
                    </Button>
                    
                    {quantity > availableStock && (
                        <p className="quantity-error">
                            ⚠️ Maximum {availableStock} {productInventory?.unit} available
                        </p>
                    )}
                </section>
            )}
            
            {expand && isOutOfStock && (
                <section className='product-info'>
                    <div className="out-of-stock-message">
                        <p>😔 This item is currently out of stock</p>
                        <p>Please check back later!</p>
                    </div>
                </section>
            )}
        </section>
    );
}

Product.propTypes = {};

export default Product;