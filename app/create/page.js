"use client";
import { React, useState, useEffect } from "react";
import styles from "@/app/styles/createpost.module.css"
import { useAuth } from "@/app/context/AuthUserContext";
import { db } from "@/app/lib/firebase"; 
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser) {
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, "users", authUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      };
      fetchUserData();
    }
  }, [authUser]);

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

    if (!userData || !userData.displayName) {
      setError("User displayName not found in Firestore.");
      return;
    }

    try {
      const postsRef = collection(db, "posts");
      await addDoc(postsRef, {
        title: formData.title || "Untitled",
        content: formData.content || "No content provided.",
        timestamp: serverTimestamp(),
        displayName: userData.displayName,
        userId: authUser.uid,
      });
      router.push("/");
    } catch (error) {
      setError("Error creating post: " + error.message);
    }
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />

        <label htmlFor="content">Content:</label>
        <textarea name="content" value={formData.content} onChange={handleInputChange} />

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
