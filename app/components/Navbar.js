'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login form submitted');
    setShowLoginModal(false);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signup form submitted');
    setShowSignupModal(false);
  };

  const openLoginModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Opening login modal');
    setShowLoginModal(true);
    setIsMenuOpen(false);
  };

  const openSignupModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Opening signup modal');
    setShowSignupModal(true);
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        E-Commerce
      </Link>

      <ul className={styles.desktopNav}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/products">Products</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>

      <div className={styles.desktopActions}>
        <button className={styles.searchIcon}>
          🔍
        </button>
        <Link href="/cart" className={styles.cartLink}>
          🛒
        </Link>
        <div className={styles.authButtons}>
          <button 
            className={styles.loginBtn}
            onClick={openLoginModal}
            type="button"
          >
            Login
          </button>
          <button 
            className={styles.signupBtn}
            onClick={openSignupModal}
            type="button"
          >
            Sign Up
          </button>
        </div>
      </div>

      <button className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </button>

      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuContent}>
          <ul className={styles.mobileNav}>
            <li><Link href="/" onClick={closeMenu}>Home</Link></li>
            <li><Link href="/products" onClick={closeMenu}>Products</Link></li>
            <li><Link href="/about" onClick={closeMenu}>About</Link></li>
            <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
          </ul>
          
          <div className={styles.mobileActions}>
            <button className={styles.mobileSearchBtn}>
              🔍 Search
            </button>
            <Link href="/cart" className={styles.mobileCartBtn} onClick={closeMenu}>
              🛒 Cart
            </Link>
          </div>

          <div className={styles.mobileAuth}>
            <button 
              className={styles.loginBtn}
              onClick={openLoginModal}
              type="button"
            >
              Login
            </button>
            <button 
              className={styles.signupBtn}
              onClick={openSignupModal}
              type="button"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div 
          className={styles.modalOverlay} 
          onClick={() => setShowLoginModal(false)}
        >
          <div 
            className={styles.modalContent} 
            onClick={e => e.stopPropagation()}
          >
            <button 
              className={styles.modalCloseBtn}
              onClick={() => setShowLoginModal(false)}
              aria-label="Close login modal"
              type="button"
            >
              ×
            </button>
            <h2 className={styles.modalTitle}>Login</h2>
            <form className={styles.modalForm} onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  placeholder="Enter your email"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  required 
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" className={styles.modalSubmitBtn}>
                Login
              </button>
            </form>
            <div className={styles.modalFooter}>
              Don't have an account?{' '}
              <a href="#" onClick={(e) => {
                e.preventDefault();
                setShowLoginModal(false);
                setShowSignupModal(true);
              }}>
                Sign up
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div 
          className={styles.modalOverlay} 
          onClick={() => setShowSignupModal(false)}
        >
          <div 
            className={styles.modalContent} 
            onClick={e => e.stopPropagation()}
          >
            <button 
              className={styles.modalCloseBtn}
              onClick={() => setShowSignupModal(false)}
              aria-label="Close signup modal"
              type="button"
            >
              ×
            </button>
            <h2 className={styles.modalTitle}>Sign Up</h2>
            <form className={styles.modalForm} onSubmit={handleSignup}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  placeholder="Enter your full name"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="signup-email">Email</label>
                <input 
                  type="email" 
                  id="signup-email" 
                  required 
                  placeholder="Enter your email"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="signup-password">Password</label>
                <input 
                  type="password" 
                  id="signup-password" 
                  required 
                  placeholder="Create a password"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="confirm-password">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirm-password" 
                  required 
                  placeholder="Confirm your password"
                />
              </div>
              <button type="submit" className={styles.modalSubmitBtn}>
                Sign Up
              </button>
            </form>
            <div className={styles.modalFooter}>
              Already have an account?{' '}
              <a href="#" onClick={(e) => {
                e.preventDefault();
                setShowSignupModal(false);
                setShowLoginModal(true);
              }}>
                Login
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 