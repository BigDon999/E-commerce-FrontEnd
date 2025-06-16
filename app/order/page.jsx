"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./OrderPage.module.css";

const OrderPage = () => {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get order from localStorage
    const orderData = localStorage.getItem('currentOrder');
    console.log('Retrieved order data:', orderData);
    
    if (!orderData) {
      console.log('No order data found');
      router.push('/cart');
      return;
    }

    try {
      const parsedOrder = JSON.parse(orderData);
      console.log('Parsed order:', parsedOrder);
      setOrder(parsedOrder);
    } catch (error) {
      console.error('Error parsing order data:', error);
      router.push('/cart');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className={styles.errorContainer}>
        <h2>No Order Found</h2>
        <p>Please complete your checkout process first.</p>
        <Link href="/cart" className={styles.backLink}>
          Return to Cart
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.orderContainer}>
      <h1 className={styles.title}>Order Confirmation</h1>
      
      <div className={styles.orderStatus}>
        <div className={`${styles.statusBadge} ${styles.successful}`}>
            Successful
           </div>

        <p className={styles.orderDate}>
          Ordered on {new Date(order.orderDate).toLocaleDateString()}
        </p>
      </div>

      <section className={styles.section}>
        <h2>Order Details</h2>
        <div className={styles.itemsList}>
          {order.items && order.items.length > 0 ? (
            order.items.map((item, index) => (
              <div key={index} className={styles.orderItem}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className={styles.itemImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.png';
                  }}
                />
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity || 1}</p>
                  <p>Price: ₦{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No items found in this order.</p>
          )}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Shipping Address</h2>
        <div className={styles.addressDetails}>
          <p><strong>{order.shippingAddress.fullName}</strong></p>
          <p>{order.shippingAddress.phone}</p>
          <p>{order.shippingAddress.addressLine}</p>
          <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Payment Information</h2>
        <div className={styles.paymentDetails}>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          {order.paymentMethod === "Pay with Card" && (
            <p><strong>Card Number:</strong> **** **** **** {order.cardDetails.number.slice(-4)}</p>
          )}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Order Summary</h2>
        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span>Items Total:</span>
            <span>₦{order.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping Fee:</span>
            <span>₦2,000</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total:</span>
            <span>₦{order.total.toLocaleString()}</span>
          </div>
        </div>
      </section>

      <div className={styles.actions}>
        <Link href="/" className={styles.continueShopping}>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderPage; 