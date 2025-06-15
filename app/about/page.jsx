import React from "react";
import styles from "./About.module.css";
import Image from "next/image";
const AboutDeMart = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image
            src="/assets/about.jpg" // Place a suitable image in public/images/
            alt="About"
            width={600}
            height={400}
            priority
            className={styles.aboutImage}
          />
        </div>
        <div className={styles.content}>
          <h2>Welcome to DeMart</h2>
          <p>
            DeMart is your go-to online store for high-quality, affordable
            products ranging from electronics, fashion, home essentials, beauty
            items, and much more. We believe shopping should be seamless,
            trustworthy, and enjoyable for everyone.
          </p>
          <p>
            Founded with a mission to redefine the Nigerian ecommerce space,
            DeMart delivers exceptional customer service, fast delivery, and a
            user-friendly shopping experience tailored for both urban and remote
            areas.
          </p>
          <p>
            Whether you're upgrading your tech, revamping your style, or looking
            for everyday items, DeMart is here to make your life easier — one
            product at a time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutDeMart;
