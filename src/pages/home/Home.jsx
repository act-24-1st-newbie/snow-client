import { useState } from 'react';

import TextField from '../../component/ui/TextField';
import EmptyTodo from './EmptyTodo';
import styles from './Home.module.css';

export default function Home() {
  const name = sessionStorage.getItem('name') ?? 'Anonymous';

  // eslint-disable-next-line
  const [todos, setTodos] = useState([]);

  return (
    <main className={styles['home-page']}>
      <section className={styles.top}>
        <div className={styles.container}>
          <div className={styles.top__greeting}>
            <p>Good afternoon, {name}.</p>
          </div>
          <div className={styles.top__info}>
            <p>You&apos;ve got</p>
            <h1>0/0</h1>
            <p>task(s) today!</p>
          </div>
          <div className={styles.top__input}>
            <TextField />
          </div>
        </div>
      </section>
      <section className={styles.bottom}>
        {!todos.length ? <EmptyTodo /> : <div className={styles.container}></div>}
      </section>
    </main>
  );
}
