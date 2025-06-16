"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Login from "./Login";
import SignUp from "./SignUp";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useProducts } from "../context/ProductContext";
import Image from "next/image";

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { searchProducts } = useProducts();

  // Memoize search results
  const searchResults = useMemo(() => {
    return searchProducts(searchQuery);
  }, [searchQuery, searchProducts]);

  // Memoize click outside handler
  const handleClickOutside = useCallback((event) => {
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
  }, [showSearch, isMobileMenuOpen]);

  // Add event listener for clicking outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Memoize search input handler
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            DeMart
          </Link>

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search products..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowSearch(true)}
            />
            <FaSearch className={styles.searchIcon} />
          </div>

          <div className={styles.navLinks}>
            <Link href="/shop" className={styles.navLink}>
              Shop
            </Link>
            <Link href="/about" className={styles.navLink}>
              About
            </Link>
            <Link href="/contact" className={styles.navLink}>
              Contact
            </Link>
          </div>

          <div className={styles.navActions}>
            <CartIcon />
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

          <button
            className={styles.hamburger}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
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

      {/* Login Modal */}
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

      {/* Sign Up Modal */}
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
