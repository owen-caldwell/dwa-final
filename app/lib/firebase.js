// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZ82kRg92qhG2HOx6NXaD-MNL41s30VnY",
  authDomain: "dwa-final-50388.firebaseapp.com",
  projectId: "dwa-final-50388",
  storageBucket: "dwa-final-50388.firebasestorage.app",
  messagingSenderId: "552780937111",
  appId: "1:552780937111:web:a403cba7d53165291336d2"
};

Object.keys(firebaseConfig).forEach((key) => {
  const configValue = firebaseConfig[key] + "";
  if (configValue.charAt(0) === '"') {
    firebaseConfig[key] = configValue.substring(1, configValue.length - 1);
  }
});

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);
