"use client";

import React, { useState } from "react";
import styles from "./CheckOutPage.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import ShippingAddress from "../components/ShippingAddress";

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems, shippingAddress, setShippingAddress } = useCart();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Pay on Delivery");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: ""
  });

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'number') {
      const formattedNumber = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim();
      setCardDetails(prev => ({ ...prev, [name]: formattedNumber }));
    }
    // Format expiry date
    else if (name === 'expiry') {
      const formattedExpiry = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{0,2})/, '$1/$2')
        .substring(0, 5);
      setCardDetails(prev => ({ ...prev, [name]: formattedExpiry }));
    }
    // Format CVC
    else if (name === 'cvc') {
      const formattedCVC = value.replace(/\D/g, '').substring(0, 3);
      setCardDetails(prev => ({ ...prev, [name]: formattedCVC }));
    }
    else {
      setCardDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const handlePlaceOrder = () => {
    // Validate required fields
    if (!shippingAddress) {
      alert("Please add a shipping address");
      return;
    }

    if (paymentMethod === "Pay with Card") {
      // Validate card details
      if (!cardDetails.name || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvc) {
        alert("Please fill in all card details");
        return;
      }
    }

    // Create order data
    const orderData = {
      items: cartItems,
      shippingAddress,
      paymentMethod,
      cardDetails: paymentMethod === "Pay with Card" ? cardDetails : null,
      total: cartTotal + 2000, // Including shipping
      orderDate: new Date().toISOString(),
      status: "pending"
    };

    // Save order to localStorage
    try {
      localStorage.setItem('currentOrder', JSON.stringify(orderData));
      // Navigate to order page
      router.push('/order');
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <h2 className={styles.title}>Checkout</h2>

      <section className={styles.section}>
        <h3>Order Summary</h3>
        <p>Items Total: <strong>₦{cartTotal.toLocaleString()}</strong></p>
        <p>Shipping Fee: <strong>₦2,000</strong></p>
        <p className={styles.total}>Total: <strong>₦{(cartTotal + 2000).toLocaleString()}</strong></p>
      </section>

      <section className={styles.section}>
        <h3>Delivery Address</h3>
        {shippingAddress ? (
          <>
            <p>{shippingAddress.fullName}</p>
            <p>{shippingAddress.phone}</p>
            <p>{shippingAddress.addressLine}, {shippingAddress.city}, {shippingAddress.state}</p>
            <button 
              onClick={() => setShowAddressModal(true)} 
              className={styles.changeBtn}
            >
              Change Address
            </button>
          </>
        ) : (
          <button 
            onClick={() => setShowAddressModal(true)} 
            className={styles.changeBtn}
          >
            Add Address
          </button>
        )}
      </section>

      <section className={styles.section}>
        <h3>Payment Method</h3>
        <select 
          className={styles.select} 
          value={paymentMethod} 
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option>Pay on Delivery</option>
          <option>Pay with Card</option>
        </select>

        {paymentMethod === "Pay with Card" && (
          <form 
            className={styles.cardForm} 
            onSubmit={handleSubmit}
            autoComplete="on"
          >
            <div className={styles.formGroup}>
              <label htmlFor="card-name">Name on Card</label>
              <input
                id="card-name"
                type="text"
                name="name"
                placeholder="Name on Card"
                value={cardDetails.name}
                onChange={handleCardInputChange}
                className={styles.input}
                autoComplete="name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="card-number">Card Number</label>
              <input
                id="card-number"
                type="text"
                name="number"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={handleCardInputChange}
                className={styles.input}
                autoComplete="cc-number"
                pattern="[0-9\s]{13,19}"
                maxLength="19"
                required
              />
            </div>

            <div className={styles.cardRow}>
              <div className={styles.formGroup}>
                <label htmlFor="card-expiry">Expiry Date</label>
                <input
                  id="card-expiry"
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={handleCardInputChange}
                  className={styles.input}
                  autoComplete="cc-exp"
                  pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                  maxLength="5"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="card-cvc">CVC</label>
                <input
                  id="card-cvc"
                  type="text"
                  name="cvc"
                  placeholder="123"
                  value={cardDetails.cvc}
                  onChange={handleCardInputChange}
                  className={styles.input}
                  autoComplete="cc-csc"
                  pattern="[0-9]{3}"
                  maxLength="3"
                  required
                />
              </div>
            </div>
          </form>
        )}
      </section>

      <button 
        onClick={handlePlaceOrder}
        className={styles.placeOrderBtn}
        disabled={!shippingAddress}
      >
        Place Order
      </button>
      <Link href="/cart" className={styles.backLink}>← Back to Cart</Link>

      {showAddressModal && (
        <ShippingAddress
          address={shippingAddress}
          onClose={() => setShowAddressModal(false)}
          onSave={setShippingAddress}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
