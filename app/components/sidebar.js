import Link from "next/link";
import styles from "@/app/styles/Sidebar.module.css";
import LoginForm from "./loginForm";

export default function Sidebar({ loginUserFunction }) {
  return (
    <div className={styles.Sidebar}>
        <LoginForm loginUserFunction={loginUserFunction} />
    </div>
  );
}