"use client";
import { createContext, useContext } from 'react'
import useFirebaseAuth from '@/app/lib/UseFirebaseAuth';
import styles from '@/app/styles/global.css';

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {}
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return <authUserContext.Provider className={styles.authWrapper} value={auth}>{children}</authUserContext.Provider>;
}

// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);