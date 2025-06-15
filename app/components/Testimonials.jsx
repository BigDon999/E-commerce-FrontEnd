"use client";
import React from "react";
import styles from "./Testimonial.module.css";

const testimonials = [
  { name: "Amaka I.", feedback: "DeMart has completely changed how I shop online. Fast, reliable, and always top quality!" },
  { name: "Tunde O.", feedback: "Love the clean interface and how easy it is to find what I need. Checkout is smooth!" },
  { name: "Blessing A.", feedback: "My favorite part is the delivery speed and product quality. Highly recommended!" },
];

const Testimonial = () => {
  return (
    <section className={styles.testimonialSection}>
      <h2 className={styles.heading}>What Our Customers Say</h2>
      <div className={styles.testimonialGrid}>
        {testimonials.map((item, index) => (
          <div key={index} className={styles.card}>
            <p className={styles.feedback}>"{item.feedback}"</p>
            <h4 className={styles.name}>— {item.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
