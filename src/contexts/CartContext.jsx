"use client";

import React, { createContext, useContext } from 'react';
import { useCart } from '@/hooks/useCart';
const CartContext = createContext(undefined);
export const CartProvider = ({ children }) => {
    const cart = useCart();
    return (<CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>);
};
export const useCartContext = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
};
export default CartContext;
