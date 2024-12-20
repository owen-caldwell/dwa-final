"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import styles from "@/app/styles/Forms.module.css";
import { useAuth } from "@/app/context/AuthUserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import zuck from "@/app/public/zuck-surf.jpg";
import Image from "next/image";

export default function Home() {
  const { authUser } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (authUser) {
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, "users", authUser.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().displayName);
        }
      };

      const fetchAllPosts = async () => {
        const postsRef = collection(db, "posts");
        const q = query(postsRef, orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const allPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(allPosts);
      };

      fetchUserData();
      fetchAllPosts();
      router.push("/");
    }
  }, [authUser, router]);
  return (
    <div className={styles.PageAuth}>
      {authUser && (
        <>
          <div>
            <h2>
              Welcome back {username}!{" "}
              <Link className={styles.Link} href="/create">
                Click here
              </Link>{" "}
              to create a new post
            </h2>
            <span>Recent Posts</span>
            {posts.map((post) => (
              <div className={styles.Post} key={post.id}>
                <h4>{post.title}</h4>
                <p>{post.content}</p>
                <small>Posted by: {post.displayName}</small>
                <br />
                <small>
                  {new Date(post.timestamp.seconds * 1000).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        </>
      )}
      {!authUser && (
        <div className={styles.Page}>
          <Sidebar />
          <div>
            <h2>
              Facebook is an online directory that connects people through
              social networks at schools.
            </h2>
            <p>
              The site is open to a lot of schools, but not everywhere yet.
              We're working on it.
            </p>
            <p>You can now use Facebook to:</p>
            <ul>
              <li>Look up people at your school.</li>
              <li>See how people know each other.</li>
              <li>Find people in your classes and groups.</li>
            </ul>
            <Image className={styles.zImg} src={zuck} alt="Mark Zuckerberg riding the waves"/>
          </div>
        </div>
      )}
    </div>
  );
}
