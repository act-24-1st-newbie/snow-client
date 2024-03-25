import TextField from '../component/ui/TextField';
import styles from './Login.module.css';

export default function Login() {
  return (
    <main className={styles['login-page']}>
      <section className={styles['welcome']}>
        <p>Welcome Newbie!!</p>
        <p>MyTodo makes it easy to stay organized and manage your life.</p>
      </section>
      <section className={styles['login']}>
        <h1>What is your name?</h1>
        <TextField />
      </section>
    </main>
  );
}
