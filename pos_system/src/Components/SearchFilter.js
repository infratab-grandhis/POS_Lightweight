import React, { useState, useEffect } from 'react';
import { useDebounce } from '../utils';
import './SearchFilter.css';

const SearchFilter = ({ 
    products, 
    inventory = [],
    onFilteredProducts, 
    initialSearchTerm = '', 
    className = '' 
}) => {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState('all');
    const [stockFilter, setStockFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isExpanded, setIsExpanded] = useState(false);

    // Use custom debounce hook for better performance
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // Extract unique categories from products
    const categories = ['all', ...new Set(products.map(product => product.category))];
    
    // Price ranges for filtering
    const priceRanges = [
        { value: 'all', label: 'All Prices' },
        { value: '0-100', label: '₹0 - ₹100' },
        { value: '100-200', label: '₹100 - ₹200' },
        { value: '200-300', label: '₹200 - ₹300' },
        { value: '300-500', label: '₹300 - ₹500' },
        { value: '500+', label: '₹500+' }
    ];

    // Note: Stock filtering would require inventory data to be passed as prop
    // Currently not implemented to keep the component simple

    // Sort options
    const sortOptions = [
        { value: 'name', label: 'Name' },
        { value: 'price', label: 'Price' },
        { value: 'category', label: 'Category' },
        { value: 'stock', label: 'Stock Level' }
    ];

    // Filter and sort products
    useEffect(() => {
        let filtered = [...products];

        // Search by name/category (using debounced search term)
        if (debouncedSearchTerm) {
            const term = debouncedSearchTerm.toLowerCase();
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(term) ||
                product.label.toLowerCase().includes(term) ||
                product.category.toLowerCase().includes(term)
            );
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        // Filter by price range
        if (priceRange !== 'all') {
            const [min, max] = priceRange === '500+' 
                ? [500, Infinity] 
                : priceRange.split('-').map(Number);
            
            filtered = filtered.filter(product => 
                product.price >= min && product.price <= (max || Infinity)
            );
        }

        // Filter by stock status (this would need inventory data)
        if (stockFilter !== 'all') {
            // Note: This would need access to inventory data
            // For now, we'll just keep all products
            // In a real implementation, you'd pass inventory as a prop
        }

        // Sort products
        filtered.sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'price':
                    aValue = a.price;
                    bValue = b.price;
                    break;
                case 'category':
                    aValue = a.category.toLowerCase();
                    bValue = b.category.toLowerCase();
                    break;
                case 'stock':
                    // Sort by available stock from inventory
                    const aStock = inventory.find(inv => inv.productId === a.id)?.available || 0;
                    const bStock = inventory.find(inv => inv.productId === b.id)?.available || 0;
                    aValue = aStock;
                    bValue = bStock;
                    break;
                default:
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        onFilteredProducts(filtered);
    }, [products, inventory, debouncedSearchTerm, selectedCategory, priceRange, stockFilter, sortBy, sortOrder, onFilteredProducts]);

    const handleClearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('all');
        setPriceRange('all');
        setStockFilter('all');
        setSortBy('name');
        setSortOrder('asc');
    };

    // Auto-reset sortBy to 'name' if 'category' is selected but becomes invalid
    useEffect(() => {
        if (sortBy === 'category' && selectedCategory !== 'all') {
            setSortBy('name');
        }
    }, [selectedCategory, sortBy]);

    const hasActiveFilters = searchTerm || selectedCategory !== 'all' || 
                           priceRange !== 'all' || stockFilter !== 'all' || 
                           sortBy !== 'name' || sortOrder !== 'asc';

    return (
        <div className={`search-filter-container ${className}`}>
            {/* Search Bar - Always Visible */}
            <div className="search-bar">
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        placeholder="🔍 Search for dishes, categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    {searchTerm && (
                        <button 
                            className="clear-search-btn"
                            onClick={() => setSearchTerm('')}
                            aria-label="Clear search"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <button 
                    className={`filter-toggle-btn ${isExpanded ? 'active' : ''}`}
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-label="Toggle filters"
                >
                    🎛️ Filters {hasActiveFilters && <span className="active-indicator">●</span>}
                </button>
            </div>

            {/* Advanced Filters - Collapsible */}
            {isExpanded && (
                <div className="filters-panel">
                    <div className="filters-row">
                        {/* Category Filter */}
                        <div className="filter-group">
                            <label htmlFor="category-filter">Category</label>
                            <select
                                id="category-filter"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="filter-select"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category === 'all' ? 'All Categories' : 
                                         category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Price Range Filter */}
                        <div className="filter-group">
                            <label htmlFor="price-filter">Price Range</label>
                            <select
                                id="price-filter"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="filter-select"
                            >
                                {priceRanges.map(range => (
                                    <option key={range.value} value={range.value}>
                                        {range.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort Options */}
                        <div className="filter-group">
                            <label htmlFor="sort-filter">Sort By</label>
                            <div className="sort-controls">
                                <select
                                    id="sort-filter"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="filter-select"
                                >
                                    {sortOptions
                                        .filter(option => 
                                            !(option.value === 'category' && selectedCategory !== 'all')
                                        )
                                        .map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))
                                    }
                                </select>
                                <button
                                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    className="sort-order-btn"
                                    aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
                                >
                                    {sortOrder === 'asc' ? '↑' : '↓'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Filter Actions */}
                    <div className="filter-actions">
                        {hasActiveFilters && (
                            <button 
                                onClick={handleClearFilters}
                                className="clear-filters-btn"
                            >
                                🔄 Clear All Filters
                            </button>
                        )}
                        <button 
                            onClick={() => setIsExpanded(false)}
                            className="close-filters-btn"
                        >
                            Close Filters
                        </button>
                    </div>
                </div>
            )}

            {/* Results Summary */}
            <div className="results-summary">
                {searchTerm && (
                    <span className="search-summary">
                        Search: "<strong>{searchTerm}</strong>" 
                    </span>
                )}
                {hasActiveFilters && (
                    <span className="filter-summary">
                        {selectedCategory !== 'all' && (
                            <span className="filter-tag">
                                {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                            </span>
                        )}
                        {priceRange !== 'all' && (
                            <span className="filter-tag">
                                {priceRanges.find(r => r.value === priceRange)?.label}
                            </span>
                        )}
                    </span>
                )}
            </div>
        </div>
    );
};

export default SearchFilter;
