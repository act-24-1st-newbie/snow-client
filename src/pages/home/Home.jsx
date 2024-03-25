import { useState } from 'react';

import TextField from '../../component/ui/TextField';
import useInput from '../../lib/useInput';
import EmptyTodo from './EmptyTodo';
import styles from './Home.module.css';

export default function Home() {
  const name = sessionStorage.getItem('name') ?? 'Anonymous';

  const [{ value: todo, ...todoProps }, setTodo] = useInput('', handleSave);
  const [todos, setTodos] = useState([]);

  function handleSave() {
    if (!todo) {
      return;
    }

    setTodos([...todos, todo]);
    setTodo('');
  }

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
            <TextField placeholder="Enter your task" value={todo} {...todoProps} onSend={handleSave} />
          </div>
        </div>
      </section>
      <section className={styles.bottom}>
        {!todos.length ? (
          <EmptyTodo />
        ) : (
          <div className={styles.container}>
            <ul>
              {todos.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
