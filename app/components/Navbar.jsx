"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import styles from "./Navbar.module.css";
import CartIcon from "./CartIcon";
import Login from "./Login";
import SignUp from "./SignUp";

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { searchProducts } = useProducts();
  const { cartItems } = useCart();
  const searchRef = useRef(null);

  const searchResults = searchProducts(searchQuery);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showSearch &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSearch(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]);

  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          DeMart
        </Link>

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
            <div className={styles.cartIconWrapper}>
              <CartIcon />
              {cartItems.length > 0 && (
                <span className={styles.cartCount}>{cartItems.length}</span>
              )}
            </div>
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
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <FaBars />
        </button>
      </nav>

      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <button
          className={styles.closeMenuBtn}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <FaTimes />
        </button>
        <div className={styles.mobileMenuContent}>
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
            <button
              className={styles.mobileSearchBtn}
              onClick={() => {
                setShowSearch(true);
                setIsMobileMenuOpen(false);
              }}
            >
              <FaSearch />
            </button>
            <Link
              href="/cart"
              className={styles.mobileCartBtn}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className={styles.cartIconWrapper}>
                <CartIcon />
                {cartItems.length > 0 && (
                  <span className={styles.cartCount}>{cartItems.length}</span>
                )}
              </div>
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
      </div>

      {/* Search Popup with Full Functionality */}
      {showSearch && (
        <div className={styles.searchPopup} ref={searchRef}>
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
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={50}
                        height={50}
                        style={{
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <h4>{product.name}</h4>
                      <p className={styles.price}>
                        ₦{product.price.toLocaleString()}
                      </p>
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

      {/* Auth Modals */}
      {showLogin && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeBtn}
              onClick={() => setShowLogin(false)}
            >
              ✕
            </button>
            <Login setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
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
            <SignUp setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
          </div>
        </div>
      )}
    </>
  );
}
