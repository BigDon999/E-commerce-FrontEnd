"use client";

import React, { useState, useEffect } from "react";
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
  const searchResults = searchProducts(searchQuery);

  // Close search and mobile menu when clicking outside
  useEffect(() => {
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch, isMobileMenuOpen]);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>DeMart</div>

        <ul className={styles.desktopNav}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        <div className={styles.desktopActions}>
          <div
            className={styles.searchIcon}
            onClick={() => setShowSearch(!showSearch)}
          >
            <FaSearch />
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
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div
          className={`${styles.mobileMenu} ${
            isMobileMenuOpen ? styles.active : ""
          }`}
        >
          <button
            className={styles.closeMenuBtn}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          <ul className={styles.mobileNav}>
            <li>
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>

          <div className={styles.mobileActions}>
            <div
              className={styles.searchIcon}
              onClick={() => {
                setShowSearch(!showSearch);
                setIsMobileMenuOpen(false);
              }}
            >
              <FaSearch />
              <span>Search</span>
            </div>
            <Link
              href="/cart"
              className={styles.cartLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <CartIcon />
              <span>Cart</span>
            </Link>
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
        </div>
      </nav>

      {/* Search Popup */}
      {showSearch && (
        <div className={styles.searchPopup}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={50}
                        height={50}
                        style={{ objectFit: "cover" }}
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
