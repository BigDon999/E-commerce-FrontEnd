"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../components/products';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setProducts(initialProducts);
      setLoading(false);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products');
      setLoading(false);
    }
  }, []);

  const searchProducts = (query) => {
    if (!query) return products;
    
    const searchQuery = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchQuery)
    );
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, searchProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
} 