"use client";

import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Login from "./Login";
import SignUp from "./SignUp";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useProducts } from "../context/ProductContext";

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { searchProducts } = useProducts();

  const searchResults = searchProducts(searchQuery);

  const handleClickOutside = (event) => {
    if (
      showSearch &&
      !event.target.closest(`.${styles.searchPopup}`) &&
      !event.target.closest(`.${styles.searchIcon}`)
    ) {
      setShowSearch(false);
      setSearchQuery("");
    }
    if (
      isMobileMenuOpen &&
      !event.target.closest(`.${styles.mobileMenu}`) &&
      !event.target.closest(`.${styles.hamburger}`)
    ) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch, isMobileMenuOpen]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          DeMart
        </Link>

        <ul className={styles.desktopNav}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/shop">Shop</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        <div className={styles.desktopActions}>
          <div className={styles.searchIcon} onClick={() => setShowSearch(true)}>
            <FaSearch />
            <span>Search</span>
          </div>
          <Link href="/cart" className={styles.cartLink}>
            <CartIcon />
          </Link>
          <div className={styles.authButtons}>
            <button
              className={styles.loginBtn}
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
            <button
              className={styles.signupBtn}
              onClick={() => setShowSignup(true)}
            >
              Sign Up
            </button>
          </div>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {showSearch && (
        <div className={styles.searchPopup}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            autoFocus
          />
          {searchQuery && (
            <div className={styles.searchResults}>
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <Link
                    href={`/product/${product.id}`}
                    key={product.id}
                    className={styles.productItem}
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery("");
                    }}
                  >
                    <div className={styles.productImage}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                          borderRadius: '4px'
                        }}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          console.error(`Failed to load image: ${product.image}`);
                          e.target.src = "/assets/placeholder.jpg";
                        }}
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <h4>{product.name}</h4>
                      <p className={styles.price}>
                        ₦{product.price.toLocaleString()}
                      </p>
                      <div className={styles.rating}>
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            style={{
                              color: i < product.rating ? "#ffcb47" : "#e0e0e0",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className={styles.noResults}>No products found</div>
              )}
            </div>
          )}
        </div>
      )}

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>
              Shop
            </Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
          </nav>
          <div className={styles.mobileActions}>
            <div className={styles.searchIcon} onClick={() => {
              setShowSearch(true);
              setIsMobileMenuOpen(false);
            }}>
              <FaSearch />
              <span>Search</span>
            </div>
            <Link href="/cart" className={styles.cartLink}>
              <CartIcon />
              <span>Cart</span>
            </Link>
          </div>
          <div className={styles.mobileAuth}>
            <button
              className={styles.loginBtn}
              onClick={() => {
                setShowLogin(true);
                setIsMobileMenuOpen(false);
              }}
            >
              Login
            </button>
            <button
              className={styles.signupBtn}
              onClick={() => {
                setShowSignup(true);
                setIsMobileMenuOpen(false);
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      {showLogin && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeBtn}
              onClick={() => setShowLogin(false)}
            >
              ✕
            </button>
            <Login />
          </div>
        </div>
      )}

      {showSignup && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeBtn}
              onClick={() => setShowSignup(false)}
            >
              ✕
            </button>
            <SignUp />
          </div>
        </div>
      )}
    </>
  );
}
