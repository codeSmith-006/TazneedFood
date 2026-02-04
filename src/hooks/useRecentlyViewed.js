import { useState, useEffect, useCallback } from 'react';
const STORAGE_KEY = 'recently_viewed_products';
const MAX_ITEMS = 8;
export const useRecentlyViewed = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setProducts(JSON.parse(stored));
            }
            catch (e) {
                console.error('Failed to parse recently viewed:', e);
            }
        }
    }, []);
    const addProduct = useCallback((product) => {
        setProducts(prev => {
            const filtered = prev.filter(p => p.id !== product.id);
            const updated = [product, ...filtered].slice(0, MAX_ITEMS);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    }, []);
    const clearAll = useCallback(() => {
        setProducts([]);
        localStorage.removeItem(STORAGE_KEY);
    }, []);
    return {
        products,
        addProduct,
        clearAll,
    };
};
export default useRecentlyViewed;
