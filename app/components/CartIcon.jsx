"use client";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./CartIcon.module.css";

export default function CartIcon() {
  const { cartCount, error } = useCart();

  return (
    <div className={styles.cartIcon}>
      <div className={styles.cartContainer}>
        <FaShoppingCart className={styles.icon} />
        {cartCount > 0 && (
          <span className={styles.count} aria-label={`${cartCount} items in cart`}>
            {cartCount}
          </span>
        )}
      </div>
      {error && (
        <div className={styles.error} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
