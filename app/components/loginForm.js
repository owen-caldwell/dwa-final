"use client";
import styles from "@/app/styles/Forms.module.css";
import { useCallback } from "react";
import { useAuth } from "@/app/context/AuthUserContext";
export default function LoginForm() {
  const { createUserWithEmailAndPassword, signInWithEmailAndPassword, authUser } = useAuth();
  console.log({ authUser });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;
      const action = e.nativeEvent.submitter.name;

      if (action === 'register') {
        createUserWithEmailAndPassword(email, password);
      } else if (action === 'login') {
        signInWithEmailAndPassword(email, password);
      }
    },
    [createUserWithEmailAndPassword, signInWithEmailAndPassword]
  );

  return (
    <div className={styles.Page}>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" />

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" />

        <button type="submit" name="register">
          Register
        </button>
        <button type="submit" name="login">
          Login
        </button>
      </form>
    </div>
  );
}
