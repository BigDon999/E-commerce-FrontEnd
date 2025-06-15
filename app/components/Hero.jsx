"use client";
import React from "react";
import styles from "./Hero.module.css";
import Link from "next/link";
// Hero component for the homepage, showcasing a call to action and primary features

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Discover the Latest Trends</h1>
        <p>Shop the newest styles in fashion and accessories — all in one place.</p>
        <div className={styles.heroButtons}>
          <Link href="/shop">
          <button className={styles.primaryBtn}>Shop Now</button>
          </Link>
          <Link href="/about" >
          <button className={styles.secondaryBtn}>Learn More</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
