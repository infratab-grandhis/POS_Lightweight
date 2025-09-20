import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import OuterLayout from '../Layouts/OuterLayout.js';
import Product from '../Components/Product.js';
import SearchFilter from '../Components/SearchFilter.js';

const Products = () => {
    const productsList = useSelector(state => state.productReducer.productsList);
    const inventory = useSelector(state => state.orderReducer.inventory);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef();
    const loadingRef = useRef();

    const PRODUCTS_PER_PAGE = 12; // Load 12 products at a time

    // Handle filtered products from SearchFilter
    const handleFilteredProducts = useCallback((filtered) => {
        setFilteredProducts(filtered);
        // Reset visible products when filters change
        setVisibleProducts(filtered.slice(0, PRODUCTS_PER_PAGE));
        setHasMore(filtered.length > PRODUCTS_PER_PAGE);
    }, []);

    // Initialize with all products when productsList first loads
    const [isInitialized, setIsInitialized] = useState(false);
    
    useEffect(() => {
        if (productsList.length > 0 && !isInitialized) {
            setFilteredProducts(productsList);
            setVisibleProducts(productsList.slice(0, PRODUCTS_PER_PAGE));
            setHasMore(productsList.length > PRODUCTS_PER_PAGE);
            setIsInitialized(true);
        }
    }, [productsList, isInitialized]);

    // Load more products
    const loadMoreProducts = useCallback(() => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);

        // Simulate network delay for realistic loading
        setTimeout(() => {
            const currentCount = visibleProducts.length;
            const nextBatch = filteredProducts.slice(currentCount, currentCount + PRODUCTS_PER_PAGE);

            if (nextBatch.length > 0) {
                setVisibleProducts(prev => [...prev, ...nextBatch]);
                setHasMore(currentCount + nextBatch.length < filteredProducts.length);
            } else {
                setHasMore(false);
            }

            setIsLoading(false);
        }, 300); // 300ms delay for smooth loading
    }, [filteredProducts, visibleProducts.length, isLoading, hasMore]);

    // Intersection Observer setup
    useEffect(() => {
        if (!loadingRef.current || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreProducts();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '100px' // Start loading 100px before the element comes into view
            }
        );

        observer.observe(loadingRef.current);
        observerRef.current = observer;

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [loadMoreProducts, hasMore]);

    return (
        <OuterLayout>
            <div className='productslist-container'>
                {/* Search and Filter Component */}
                <SearchFilter
                    products={productsList}
                    inventory={inventory}
                    onFilteredProducts={handleFilteredProducts}
                />

                {/* Results Info */}
                {filteredProducts.length !== productsList.length && (
                    <div className="results-info">
                        <p>
                            Showing {filteredProducts.length} of {productsList.length} items
                            {filteredProducts.length === 0 && " - Try different filters"}
                        </p>
                    </div>
                )}

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="no-results">
                        <div className="no-results-content">
                            <h3>🔍 No dishes found</h3>
                            <p>No items match your current filters. Try different price range or category.</p>
                            <p className="filter-suggestion">
                                Current filters: {productsList.length} total items filtered by your selections
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="products-grid">
                        {visibleProducts.map(item => (
                            <LazyProduct key={item?.id} product={item} />
                        ))}
                    </div>
                )}

                {/* Loading indicator and intersection target */}
                {hasMore && (
                    <div 
                        ref={loadingRef} 
                        className="loading-container"
                        style={{
                            height: '100px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '20px 0'
                        }}
                    >
                        {isLoading ? (
                            <div className="loading-spinner">
                                <div className="spinner"></div>
                                <p>Loading more delicious items...</p>
                            </div>
                        ) : (
                            <p style={{ color: '#666' }}>Scroll to load more...</p>
                        )}
                    </div>
                )}

                {!hasMore && visibleProducts.length > 0 && (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                        <h3>🎉 You've seen all our amazing items!</h3>
                        <p>Ready to order? Check your cart!</p>
                    </div>
                )}
            </div>
        </OuterLayout>
    );
};

// Lazy loading wrapper for individual products
const LazyProduct = ({ product }) => {
    const [isVisible, setIsVisible] = useState(false);
    const productRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        if (productRef.current) {
            observer.observe(productRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={productRef} className="lazy-product-wrapper">
            {isVisible ? (
                <div className="product-container">
                    <Product product={product} />
                </div>
            ) : (
                <div className="product-placeholder" style={{
                    height: '300px',
                    background: '#f0f0f0',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999'
                }}>
                    <div className="placeholder-content">
                        <div className="placeholder-image"></div>
                        <div className="placeholder-text"></div>
                    </div>
                </div>
            )}
        </div>
    );
};
  
export default Products;