import styles from "@/app/styles/Forms.module.css";

export default function CreateUserForm() {
  const { createUserWithEmailAndPassword, authUser } = useAuth();
  console.log({ authUser });
  const createUserSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;
      createUserWithEmailAndPassword(email, password);
    },
    [createUserWithEmailAndPassword]
  );
  return (
    <div className={styles.Page}>
      <h2>Register to Facebook!</h2>
      <form className={styles.Form} onSubmit={(e) => createUserWithEmailAndPassword(e)}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" />

        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
