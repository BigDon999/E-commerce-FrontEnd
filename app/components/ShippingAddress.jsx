"use client";

import React, { useState } from "react";
import styles from "./ShippingAddress.module.css";

const ShippingAddress = ({ address, onClose, onSave }) => {
  const [formData, setFormData] = useState(address || {
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className={styles.addressModalBackdrop}>
      <div className={styles.addressModal}>
        <h3 className={styles.modalTitle}>Shipping Address</h3>
        <form onSubmit={handleSubmit} className={styles.addressForm}>
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className={styles.addressInput}
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className={styles.addressInput}
          />
          <input
            name="addressLine"
            placeholder="Address Line"
            value={formData.addressLine}
            onChange={handleChange}
            required
            className={styles.addressInput}
          />
          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className={styles.addressInput}
          />
          <input
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
            className={styles.addressInput}
          />
          <div className={styles.actions}>
            <button type="submit" className={styles.saveBtn}>Save</button>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingAddress;
