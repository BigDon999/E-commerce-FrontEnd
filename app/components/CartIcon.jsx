"use client";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./CartIcon.module.css";

export default function CartIcon() {
  const { cartItems } = useCart();

  return (
    <div className={styles.cartIcon}>
      <FaShoppingCart />
    </div>
  );
}
