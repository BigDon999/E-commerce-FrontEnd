"use client";
import { createContext, useContext, useState, useEffect } from "react";

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

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);

  // Load cart and address from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      const savedAddress = localStorage.getItem('shippingAddress');
      
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart) && parsedCart.every(validateCartItem)) {
          setCartItems(parsedCart);
          setCartCount(parsedCart.length);
        } else {
          console.error('Invalid cart data in localStorage');
          localStorage.removeItem('cart');
        }
      }

      if (savedAddress) {
        const parsedAddress = JSON.parse(savedAddress);
        if (validateAddress(parsedAddress)) {
          setShippingAddress(parsedAddress);
        } else {
          console.error('Invalid address data in localStorage');
          localStorage.removeItem('shippingAddress');
        }
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      setError('Failed to load data. Please try again.');
    }
  }, []);

  // Save cart and address to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      setCartCount(cartItems.length);
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
      setError('Failed to save cart. Please try again.');
    }
  }, [cartItems]);

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

  const validateCartItem = (item) => {
    return (
      item &&
      typeof item.id === 'number' &&
      typeof item.name === 'string' &&
      typeof item.price === 'number' &&
      typeof item.quantity === 'number' &&
      item.quantity > 0 &&
      item.quantity <= MAX_ITEM_QUANTITY
    );
  };

  const validateAddress = (address) => {
    return (
      address &&
      typeof address.fullName === 'string' &&
      typeof address.phone === 'string' &&
      typeof address.addressLine === 'string' &&
      typeof address.city === 'string' &&
      typeof address.state === 'string'
    );
  };

  const addToCart = (product) => {
    try {
      if (!product || typeof product.id === 'undefined') {
        throw new Error('Invalid product data');
      }

      setCartItems((prevItems) => {
        if (prevItems.length >= MAX_CART_ITEMS) {
          setError('Cart is full. Please remove some items first.');
          return prevItems;
        }

        const existingItem = prevItems.find(item => item.id === product.id);
        
        if (existingItem) {
          if (existingItem.quantity >= MAX_ITEM_QUANTITY) {
            setError(`Maximum quantity (${MAX_ITEM_QUANTITY}) reached for this item.`);
            return prevItems;
          }
          return prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('Failed to add item to cart. Please try again.');
    }
  };

  const value = {
    cartCount,
    setCartCount,
    cartItems,
    setCartItems,
    addToCart,
    error,
    setError,
    shippingAddress,
    setShippingAddress,
  };

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
