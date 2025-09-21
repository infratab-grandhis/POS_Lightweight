import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OuterLayout from '../Layouts/OuterLayout.js';
import Product from '../Components/Product.js';
import SearchFilter from '../Components/SearchFilter.js';
import { initializeProductsPageData, fetchMoreProducts } from '../Redux/Product/actions';

const Products = () => {
    const dispatch = useDispatch();
    const productsList = useSelector(state => state.productReducer.productsList);
    const loading = useSelector(state => state.productReducer.loading);
    const error = useSelector(state => state.productReducer.error);
    const pagination = useSelector(state => state.productReducer.pagination);
    const inventory = useSelector(state => state.orderReducer.inventory);
    
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isDataInitialized, setIsDataInitialized] = useState(false);
    
    const observerRef = useRef();
    const loadingRef = useRef();

    const PRODUCTS_PER_PAGE = 30; // Load 30 products at a time

    // Handle filtered products from SearchFilter
    const handleFilteredProducts = useCallback((filtered) => {
        setFilteredProducts(filtered);
        // For filtered products, we disable API pagination and work with the loaded data
        setHasMore(false); // No more API calls when filtering
    }, []);

    // Load data when component mounts
    useEffect(() => {
        if (!isDataInitialized) {
            dispatch(initializeProductsPageData());
            setIsDataInitialized(true);
        }
    }, [dispatch, isDataInitialized]);

    // Update filtered products when productsList changes
    useEffect(() => {
        if (productsList.length > 0) {
            setFilteredProducts(productsList);
            
            // Simple logic: if we loaded exactly PRODUCTS_PER_PAGE * currentPage, there might be more
            const expectedCount = PRODUCTS_PER_PAGE * currentPage;
            const hasExactlyExpected = productsList.length === expectedCount;
            const hasEnoughForNextPage = productsList.length >= PRODUCTS_PER_PAGE;
            
            // Set hasMore based on simple logic
            setHasMore(hasExactlyExpected && hasEnoughForNextPage);
        }
    }, [productsList, currentPage]);

    // Load more products from API
    const loadMoreProducts = useCallback(async () => {
        if (isLoadingMore || !hasMore || loading) {
            return;
        }
        setIsLoadingMore(true);
        const nextPage = currentPage + 1;
        
        try {
            await dispatch(fetchMoreProducts(nextPage, PRODUCTS_PER_PAGE));
            setCurrentPage(nextPage);
        } catch (error) {
            // Handle error silently
        } finally {
            setIsLoadingMore(false);
        }
    }, [dispatch, currentPage, isLoadingMore, hasMore, loading]);

    // Intersection Observer setup
    useEffect(() => {
        if (!loadingRef.current || !hasMore) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && hasMore && !isLoadingMore) {
                        // Use the current values directly to avoid stale closure
                        if (hasMore && !isLoadingMore) {
                            loadMoreProducts();
                        }
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px' // Start loading 50px before the element comes into view
            }
        );

        observer.observe(loadingRef.current);
        observerRef.current = observer;

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [hasMore, isLoadingMore]); // Remove loadMoreProducts to prevent infinite recreation

    // Show loading state while fetching initial data
    if (loading && productsList.length === 0) {
        return (
            <OuterLayout>
                <div className='productslist-container'>
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div className="spinner"></div>
                        <h3>🍽️ Loading our delicious menu...</h3>
                        <p>Please wait while we fetch all available items</p>
                    </div>
                </div>
            </OuterLayout>
        );
    }

    // Show error state if API call failed
    if (error) {
        return (
            <OuterLayout>
                <div className='productslist-container'>
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <h3>😕 Oops! Something went wrong</h3>
                        <p>Unable to load menu items: {error}</p>
                        <p>Please check if the API server is running and try refreshing the page.</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            style={{ 
                                padding: '10px 20px', 
                                marginTop: '20px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            </OuterLayout>
        );
    }

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
                {filteredProducts.length === 0 && !loading ? (
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
                        {filteredProducts.map(item => (
                            <LazyProduct key={item?.id} product={item} />
                        ))}
                    </div>
                )}

                {/* Loading indicator and intersection target */}
                {(hasMore || productsList.length >= PRODUCTS_PER_PAGE) && (
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
                        {isLoadingMore ? (
                            <div className="loading-spinner">
                                <div className="spinner"></div>
                                <p>Loading more delicious items...</p>
                            </div>
                        ) : hasMore ? (
                            <p style={{ color: '#666' }}>Scroll to load more...</p>
                        ) : (
                            <p style={{ color: '#999' }}>All products loaded</p>
                        )}
                    </div>
                )}

                {!hasMore && productsList.length > 0 && (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                        <h3>🎉 You've seen all our amazing items!</h3>
                        <p>Ready to order? Check your cart!</p>
                        <p style={{ fontSize: '0.9em', marginTop: '10px' }}>
                            Loaded {productsList.length} products total
                        </p>
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