"use client";
import React from "react";
import styles from "./CategorySection.module.css";
import Image from "next/image";

const categories = [
  { title: "Men", image: "/assets/men.jpg" },
  { title: "Women", image: "/assets/women.jpg" },
  { title: "Electronics", image: "/assets/electronics.jpg" },
];

const CategorySection = () => {
  return (
    <section className={styles.categorySection}>
      <h2 className={styles.title}>Shop by Category</h2>
      <div className={styles.categoriesGrid}>
        {categories.map((category, index) => (
          <div className={styles.categoryCard} key={index}>
            <div className={styles.imageWrapper}>
              <Image 
                src={category.image} 
                alt={category.title} 
                fill 
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h3>{category.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
