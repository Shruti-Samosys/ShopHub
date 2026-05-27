import React from 'react'
import { createContext } from 'react';
import { useState } from 'react';
import products from '../data/products';
export const CartContext = React.createContext();

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function addToCart(productId){
        const existing = cartItems.find(item => item.id === productId);
        if(existing) {
            const updatedCart = cartItems.map(item => item.id === productId ? {...item, quantity: item.quantity + 1} : item);
            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, {id: productId, quantity: 1}]);
        }
     }

     function getCartItems() {
        return cartItems.map(cartItem => {
            const product = products.find(p => p.id === cartItem.id);
            return {
                ...product,
                quantity: cartItem.quantity
            }
        });
     }

     function updateCartItem(productId, quantity) {
        if(quantity <= 0) {
            setCartItems(cartItems.filter(item => item.id !== productId));
        } else {
            const updatedCart = cartItems.map(item => item.id === productId ? {...item, quantity} : item);
            setCartItems(updatedCart);
        }

     }

     function removeFromCart(productId) {
        setCartItems(cartItems.filter(item => item.id !== productId));
     }

     function getCartTotal() {
        return cartItems.reduce((total, item) => {
            const product = products.find(p => p.id === item.id);
            return total + product.price * item.quantity;
        }, 0);
     }

    function clearCart() {
        setCartItems([]);
    }
    return (
        <CartContext.Provider value={{removeFromCart, updateCartItem, cartItems, addToCart , getCartItems, getCartTotal, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}
