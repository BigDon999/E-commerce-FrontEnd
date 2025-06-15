"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import ShippingAddress from "../components/ShippingAddress";
import styles from "./CartPage.module.css";

const CartPage = () => {
  const { cartItems, setCartItems, shippingAddress, setShippingAddress } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleQuantityChange = (id, change) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <section className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>Your Cart</h2>
      <div className={styles.cartGrid}>
        <div className={styles.cartItems}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Your cart is empty.</p>
              <Link href="/shop" className={styles.continueShopping}>
                Continue Shopping
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.imageContainer}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className={styles.itemImage}
                    onError={(e) => {
                      e.target.src = "/assets/placeholder.jpg";
                    }}
                  />
                </div>
                <div className={styles.itemDetails}>
                  <h4>{item.name}</h4>
                  <p>₦{item.price.toLocaleString()}</p>
                  <div className={styles.controls}>
                    <button 
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className={styles.quantityBtn}
                    >
                      -
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className={styles.quantityBtn}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className={styles.itemTotal}>
                  ₦{(item.price * (item.quantity || 1)).toLocaleString()}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className={styles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className={styles.summary}>
            <h3>Cart Summary</h3>
            <div className={styles.summaryDetails}>
              <p>Subtotal: <strong>₦{cartTotal.toLocaleString()}</strong></p>
              <p>Shipping: <strong>₦2,000</strong></p>
              <p className={styles.total}>Total: <strong>₦{(cartTotal + 2000).toLocaleString()}</strong></p>
            </div>

            <p className={styles.addressLabel}>
              Shipping Address: <strong>{shippingAddress ? `${shippingAddress.addressLine}, ${shippingAddress.city}, ${shippingAddress.state}` : "Not Set"}</strong>
            </p>

            <button 
              onClick={() => setShowAddressModal(true)} 
              className={styles.addressBtn}
            >
              {shippingAddress ? "Change Shipping Address" : "Add Shipping Address"}
            </button>

            <button onClick={handleCheckout} className={styles.checkoutBtn}>Proceed to Checkout</button>
            <Link href="/shop" className={styles.continueShopping}>
              Continue Shopping
            </Link>
          </div>
        )}
      </div>

      {showAddressModal && (
        <ShippingAddress
          address={shippingAddress}
          onClose={() => setShowAddressModal(false)}
          onSave={setShippingAddress}
        />
      )}
    </section>
  );
};

export default CartPage;

