"use client";
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const MAX_CART_ITEMS = 20;
const MAX_ITEM_QUANTITY = 10;

const CartContext = createContext({
  cartCount: 0,
  setCartCount: () => {},
  cartItems: [],
  addToCart: () => {},
  setCartItems: () => {},
  error: null,
  setError: () => {},
  shippingAddress: null,
  setShippingAddress: () => {},
});

const DEFAULT_CART = [];

export function CartProvider({ children }) {
  const [cart, setCart] = useState(DEFAULT_CART);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);

  // Initialize cart from localStorage
  useEffect(() => {
    const initializeCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            setCart(parsedCart);
          }
        }
      } catch (err) {
        console.error('Error loading cart:', err);
        setCart(DEFAULT_CART);
      } finally {
        setLoading(false);
      }
    };

    initializeCart();
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('cart', JSON.stringify(cart));
      } catch (err) {
        console.error('Error saving cart:', err);
      }
    }
  }, [cart, loading]);

  useEffect(() => {
    try {
      if (shippingAddress) {
        localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
      }
    } catch (error) {
      console.error('Error saving address to localStorage:', error);
      setError('Failed to save address. Please try again.');
    }
  }, [shippingAddress]);

  const addToCart = useCallback((product) => {
    if (!product?.id) return;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart(DEFAULT_CART);
  }, []);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const value = useMemo(() => ({
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    error,
    setError,
    shippingAddress,
    setShippingAddress,
  }), [cart, loading, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount, error, shippingAddress]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
