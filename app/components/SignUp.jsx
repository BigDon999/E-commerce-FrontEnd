import React from "react";
import styles from "./AuthForm.module.css";

const SignUp = ({ setShowLogin, setShowSignup }) => {
  return (
    <div className={styles.authContainer}>
      <h2 className={styles.title}>Sign Up</h2>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Full Name"
          className={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <span
          style={{ color: "#e83e8c", cursor: "pointer" }}
          onClick={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default SignUp;
