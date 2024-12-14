"use client";
import React from "react";
import Sidebar from "./components/sidebar";
import styles from "@/app/styles/Forms.module.css";
import { useAuth } from "@/app/context/AuthUserContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser) router.push("/");
  }, [authUser]);

  return (
    <div className={styles.Page}>
      <Sidebar />
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
    </div>
  );
}
