"use client";
import React from "react";
import styles from "./ServicesSection.module.css";
import { FaShippingFast, FaHeadset, FaCreditCard, FaUndo, FaTags, FaShieldAlt } from "react-icons/fa";


const services = [
  {
    title: "Fast Delivery",
    description: "Get your orders delivered to your doorstep within 24-48 hours.",
    icon: <FaShippingFast />,
  },
  {
    title: "24/7 Support",
    description: "Our team is here to help you anytime, any day.",
    icon: <FaHeadset />,
  },
  {
    title: "Secure Payment",
    description: "Safe and reliable payment options for your convenience.",
    icon: <FaCreditCard />,
  },
  {
    title: "Easy Returns",
    description: "Not satisfied? Return products easily within 7 days.",
    icon: <FaUndo />,
  },
  {
    title: "Best Prices",
    description: "Get the best deals and discounts every day.",
    icon: <FaTags />,
  },
  {
    title: "Privacy Protected",
    description: "We care about your data — it's safe with us.",
    icon: <FaShieldAlt />,
  },
];

const ServicesSection = () => {
  return (
    <section className={styles.servicesSection}>
      <h2 className={styles.heading}>Our Services</h2>
      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <div key={index} className={styles.serviceCard}>
            <div className={styles.icon}>{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
