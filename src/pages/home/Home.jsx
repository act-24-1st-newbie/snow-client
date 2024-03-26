import { useState } from 'react';

import Button from '@/component/ui/Button';
import TextField from '@/component/ui/TextField';
import { useInput } from '@/lib/useInput';

import EmptyTodo from './EmptyTodo';
import styles from './Home.module.css';
import TodoItem from './TodoItem';

/**
 * Home Page
 */
export default function Home() {
  const name = sessionStorage.getItem('name') ?? 'Anonymous';

  const [todoProps, setTodo] = useInput('', handleSave);
  const [todos, setTodos] = useState([
    { id: 1, content: 'aaa', isDone: false, createdDate: new Date().getTime(), modifiedDate: new Date().getTime() },
  ]);

  function handleItemClick(id) {
    setTodos(
      todos.map(item => {
        if (item.id !== id) return { ...item, isEditing: false };
        return { ...item, isEditing: true };
      }),
    );
  }

  function handleItemUpdate(id, value) {
    setTodos(
      todos.map(item => {
        if (item.id !== id) return item;
        return { ...item, isEditing: false, content: value, modifiedDate: new Date().getTime() };
      }),
    );
  }

  function handleDoneChange(id) {
    setTodos(
      todos.map(item => {
        if (item.id !== id) return item;
        return { ...item, isDone: !item.isDone, modifiedDate: new Date().getTime() };
      }),
    );
  }

  function handleSave() {
    const { value: todo } = todoProps;
    if (!todo) {
      return;
    }

    const now = new Date().getTime();

    setTodos([
      {
        id: now,
        content: todo,
        isDone: false,
        createdDate: now,
        modifiedDate: now,
      },
      ...todos,
    ]);

    setTodo('');
  }

  function handleDelete(id) {
    setTodos(todos.filter(item => item.id !== id));
  }

  function handleClearAll() {
    setTodos([]);
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
            <TextField placeholder="Enter your task" {...todoProps} onSend={handleSave} />
          </div>
        </div>
      </section>
      <section className={styles.bottom}>
        {!todos.length ? (
          <EmptyTodo />
        ) : (
          <div className={styles.container}>
            <div className={styles.todo__control}>
              <select></select>
              <Button variants="link" onClick={handleClearAll}>
                Clear All
              </Button>
            </div>
            <ul className={styles.todo__list}>
              {todos.map(item => (
                <TodoItem
                  key={item.id}
                  item={item}
                  isEditing={item.isEditing}
                  onClick={e => handleItemClick(item.id, e)}
                  onUpdate={v => handleItemUpdate(item.id, v)}
                  onDoneChange={e => handleDoneChange(item.id, e)}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
