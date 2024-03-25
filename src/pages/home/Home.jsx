import { useState } from 'react';

import cn from 'classnames';
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
 * @param {{item: Todo, onDoneChange: Function}} param0
 */
function TodoItem({ item, onDoneChange }) {
  const { content, isDone, createdDate } = item;
  return (
    <li className={styles.todo__item}>
      <Checkbox value={isDone} onChange={onDoneChange} />
      <span className={cn(styles.todo__content, { [styles['todo__content--done']]: isDone })}>{content}</span>
      <span>{format(createdDate, 'MM/dd HH:mm')}</span>
      <DeleteButton />
    </li>
  );
}

TodoItem.propTypes = {
  item: PropTypes.object,
  onDoneChange: PropTypes.func,
};

/**
 * Home Page
 */
export default function Home() {
  const name = sessionStorage.getItem('name') ?? 'Anonymous';

  const [{ value: todo, ...todoProps }, setTodo] = useInput('', handleSave);
  const [todos, setTodos] = useState([
    { content: 'aaa', isDone: false, createdDate: new Date().getTime(), modifiedDate: new Date().getTime() },
  ]);

  function handleDoneChange(id) {
    setTodos(
      todos.map(item => {
        if (item.id !== id) return item;
        return { ...item, isDone: !item.isDone, modifiedDate: new Date().getTime() };
      }),
    );
  }

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
                <TodoItem key={idx} item={item} onDoneChange={e => handleDoneChange(item.id, e)} />
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
