import TextField from '../component/ui/TextField';
import styles from './Home.module.css';

export default function Home() {
  const name = sessionStorage.getItem('name') ?? 'Anonymous';

  return (
    <main className={styles['home-page']}>
      <section>
        <div className={styles.greeting}>
          <p>Good afternoon, {name}.</p>
        </div>
        <div className={styles.info}>
          <p>You&apos;ve got</p>
          <h1>0/0</h1>
          <p>task(s) today!</p>
        </div>
        <div className={styles.input}>
          <TextField />
        </div>
      </section>
      <section />
    </main>
  );
}
