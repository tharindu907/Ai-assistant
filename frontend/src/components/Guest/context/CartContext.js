import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [orderTotal, setOrderTotal] = useState(() => {
        // Retrieve accumulated order total from localStorage or initialize as 0
        const savedTotal = localStorage.getItem('orderTotal');
        return savedTotal ? parseFloat(savedTotal) : 0;
    });

    useEffect(() => {
        // Save accumulated order total to localStorage whenever it changes
        localStorage.setItem('orderTotal', orderTotal);
    }, [orderTotal]);

    return (
        <CartContext.Provider value={{ cart, setCart, orderTotal, setOrderTotal }}>
            {children}
        </CartContext.Provider>
    );
};
