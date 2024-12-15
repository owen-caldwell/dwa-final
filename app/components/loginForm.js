"use client";
import styles from "@/app/styles/Forms.module.css";
import { useCallback } from "react";
import { useAuth } from "@/app/context/AuthUserContext";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
export default function LoginForm() {
  const {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    authUser,
  } = useAuth();
  console.log({ authUser });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;
      const username = e.currentTarget.username.value;
      const action = e.nativeEvent.submitter.name;

      if (action === "register") {
        const userCredential = await createUserWithEmailAndPassword(
          email,
          password
        );
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: username || "",
        });
      } else if (action === "login") {
        signInWithEmailAndPassword(email, password);
      }
    },
    [createUserWithEmailAndPassword, signInWithEmailAndPassword]
  );

  return (
    <div className={styles.Page}>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" />

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
