import React from "react";
import styles from "./AuthForm.module.css";

const Login = ({ setShowLogin, setShowSignup }) => {
  return (
    <div className={styles.authContainer}>
      <h2 className={styles.title}>Login</h2>
      <form className={styles.form}>
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
          Login
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <span
          style={{ color: "#e83e8c", cursor: "pointer" }}
          onClick={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
