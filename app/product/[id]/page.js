"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import styles from './page.module.css';

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Product not found</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.productContainer}>
        <div className={styles.imageContainer}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
            onError={(e) => {
              console.error(`Failed to load product image: ${product.image}`);
              e.target.src = "/assets/placeholder.jpg";
            }}
          />
        </div>
        
        <div className={styles.productInfo}>
          <h1 className={styles.productName}>{product.name}</h1>
          
          <div className={styles.rating}>
            {[...Array(5)].map((_, i) => (
              <span key={i} style={{ color: i < product.rating ? '#ffcb47' : '#e0e0e0' }}>★</span>
            ))}
            <span className={styles.ratingText}>({product.rating} out of 5)</span>
          </div>

          <p className={styles.price}>₦{product.price.toLocaleString()}</p>

          <div className={styles.buttonGroup}>
            <button 
              className={styles.addToCartBtn}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
            <Link href="/cart" className={styles.viewCartBtn}>
              View Cart
            </Link>
          </div>

          <div className={styles.features}>
            <h2>Product Features</h2>
            <ul>
              <li>High-quality materials</li>
              <li>Durable and long-lasting</li>
              <li>Modern design</li>
              <li>Perfect for everyday use</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 