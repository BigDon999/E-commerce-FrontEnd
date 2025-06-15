import React from "react";
import styles from "./AuthForm.module.css";

const Login = () => {
  return (
    <div className={styles.authContainer}>
      <h2 className={styles.title}>Login</h2>
      <form className={styles.form}>
        <input type="email" placeholder="Email" className={styles.input} required />
        <input type="password" placeholder="Password" className={styles.input} required />
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;

