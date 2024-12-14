"use client";
import Link from "next/link";
import styles from "@/app/styles/Headers.module.css"; 
import { useAuth } from "@/app/context/AuthUserContext";

export default function Header() {
    const { signOut, authUser } = useAuth();
  return (
    <header className={styles.Header}>
      <div>
        <div>
          <Link href="/"><h1>facebook</h1></Link>
        </div>
      </div>
      <nav>
        <div className={styles.Nav}>
          <ul>
            {authUser && (
              <>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <a onClick={signOut}>Log Out</a>
                </li>
              </>
            )}

            {!authUser && (
              <>
                <li>
                  <Link href="/create">Create user</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}