"use client";
import {React, useState} from "react";
import styles from "@/app/styles/createpost.module.css"
import { useAuth } from "@/app/context/AuthUserContext";
import { db } from "@/app/lib/firebase"; 
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const { authUser } = useAuth();
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!authUser) {
      setError("You must be logged in to create a post.");
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;

      if (!userData || !userData.displayName) {
        throw new Error("User displayName not found in Firestore.");
      }

      const postsRef = collection(db, "posts");
      await addDoc(postsRef, {
        title: formData.title || "Untitled",
        content: formData.content || "No content provided.",
        timestamp: serverTimestamp(),
        displayName: userData.displayName,
        userId: user.uid,
      });

      alert("Post created successfully!");
      // router.push("/dashboard");
    } catch (error) {
      console.error("Error creating post:", error.message);
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <div>
      <div className={styles.createPostCard}>
        <div className={styles.createPostHeader}>Create Post</div>
        <div className={styles.createPostContent}>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label className={styles.inputLabel}>
              Post Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className={styles.inputBox}
              />
            </label>
            <label className={styles.inputLabel}>
              Post Content:
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                className={styles.inputBox}
              />
            </label>
            <button type="submit" className={styles.submitButton}>
              Create Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
