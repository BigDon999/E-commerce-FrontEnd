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
                      <p className={styles.price}>₦{product.price.toLocaleString()}</p>
                      <p className={styles.description}>{product.description}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className={styles.noResults}>No products found</p>
              )}
            </div>
          )}
        </div>
      )}

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showSignup && <SignUp onClose={() => setShowSignup(false)} />}
    </>
  );
}
