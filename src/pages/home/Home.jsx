import { useState } from 'react';

import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Checkbox from '@/component/ui/Checkbox';
import DeleteButton from '@/component/ui/DeleteButton';
import TextField from '@/component/ui/TextField';
import useInput from '@/lib/useInput';

import EmptyTodo from './EmptyTodo';
import styles from './Home.module.css';

/**
 * TodoItem Component
 * @param {Todo} param0
 */
function TodoItem({ content, createdAt }) {
  return (
    <li className={styles.todo__item}>
      <Checkbox />
      <span className={styles.todo__content}>{content}</span>
      <span>{format(createdAt, 'MM/dd HH:mm')}</span>
      <DeleteButton />
    </li>
  );
}

TodoItem.propTypes = {
  content: PropTypes.string,
  createdAt: PropTypes.number,
};

/**
 * Home Page
 */
export default function Home() {
  const name = sessionStorage.getItem('name') ?? 'Anonymous';

  const [{ value: todo, ...todoProps }, setTodo] = useInput('', handleSave);
  const [todos, setTodos] = useState([{ content: 'aaa', createdAt: new Date().getTime() }]);

  function handleSave() {
    if (!todo) {
      return;
    }

    setTodos([{ content: todo, createdAt: new Date().getTime() }, ...todos]);
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
            <ul className={styles.todo__list}>
              {todos.map((item, idx) => (
                <TodoItem key={idx} {...item} />
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
