import React from "react";
import styles from "./Contact.module.css";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Contact = () => {
  return (
    <section className={styles.contactSection}>
      <h2>Contact Us</h2>
      <p>Feel free to reach out for any inquiries, collaborations, or support.</p>

      <form className={styles.contactForm}>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required />
        <button type="submit">Send Message</button>
      </form>

      <div className={styles.socialIcons}>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FaTwitter />
        </a>
      </div>
    </section>
  );
};

export default Contact;
