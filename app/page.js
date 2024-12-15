"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import styles from "@/app/styles/Forms.module.css";
import { useAuth } from "@/app/context/AuthUserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";


export default function Home() {
  const { authUser } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (authUser) {
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, "users", authUser.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().displayName);
        }
      };
      fetchUserData();
      router.push("/");
    }
  }, [authUser, router]);
  return (
    <div className={styles.Page}>
      <Sidebar />
      {authUser && (
        <>
          <h2>Welcome back {username}! <Link className={styles.Link} href="/create">Click here</Link> to create a new post</h2>
        </>
      )}
      {!authUser && (
        <div>
          <h2>
            Facebook is an online directory that connects people through social
            networks at schools.
          </h2>
          <p>
            The site is open to a lot of schools, but not everywhere yet. We're
            working on it.
          </p>
          <p>You can now use Facebook to:</p>
          <ul>
            <li>Look up people at your school.</li>
            <li>See how people know each other.</li>
            <li>Find people in your classes and groups.</li>
          </ul>
        </div>
      )}
    </div>
  );
}
