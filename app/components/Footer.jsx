"use client";
import React from "react";
import styles from "./Footer.module.css";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerColumn}>
        <div className={styles.footerLogo}>DeMart</div>
        <p>Making shopping simple and fun.</p>
        <div className={styles.socialIcons}>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
        </div>
      </div>

      <div className={styles.footerColumn}>
        <h4>Quick Links</h4>
        <ul className={styles.footerLinks}>
          <li><a href="/">Home</a></li>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/cart">Cart</a></li>
        </ul>
      </div>

      <div className={styles.footerColumn}>
        <h4>Account</h4>
        <ul className={styles.footerLinks}>
          <li><a href="#">Login</a></li>
          <li><a href="#">Sign Up</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
