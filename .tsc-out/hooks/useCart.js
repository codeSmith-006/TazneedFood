import { useState, useEffect, useCallback } from 'react';
const CART_STORAGE_KEY = 'ecommerce_cart';
export const useCart = () => {
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    // Load cart from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            try {
                setItems(JSON.parse(stored));
            }
            catch (e) {
                console.error('Failed to parse cart:', e);
            }
        }
    }, []);
    // Save cart to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items]);
    const addItem = useCallback((product, quantity = 1) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item);
            }
            return [...prev, { ...product, quantity }];
        });
    }, []);
    const removeItem = useCallback((id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    }, []);
    const updateQuantity = useCallback((id, quantity) => {
        if (quantity < 1) {
            removeItem(id);
            return;
        }
        setItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    }, [removeItem]);
    const clearCart = useCallback(() => {
        setItems([]);
    }, []);
    const openCart = useCallback(() => setIsOpen(true), []);
    const closeCart = useCallback(() => setIsOpen(false), []);
    const toggleCart = useCallback(() => setIsOpen(prev => !prev), []);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return {
        items,
        isOpen,
        totalItems,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
    };
};
export default useCart;
