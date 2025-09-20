import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing values
 * Delays updating the debounced value until after the specified delay
 * Useful for search inputs, API calls, etc.
 * 
 * @param {any} value - The value to debounce
 * @param {number} delay - The delay in milliseconds (default: 300ms)
 * @returns {any} The debounced value
 * 
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * 
 * // Use debouncedSearchTerm for API calls or expensive operations
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     performSearch(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 */
export const useDebounce = (value, delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set up the timeout to update debounced value
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup timeout on value change or component unmount
        return () => {
            clearTimeout(timeoutId);
        };
    }, [value, delay]);

    return debouncedValue;
};

