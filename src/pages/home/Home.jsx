import { useCallback, useEffect, useState } from 'react';

import Topbar from '@/component/Topbar';
import Button from '@/component/ui/Button';
import Dropdown from '@/component/ui/Dropdown';
import TextField from '@/component/ui/TextField';
import { deleteTask, deleteTasks, getTasks, patchTask, postTask } from '@/lib/service';
import { useToast } from '@/lib/useToast';
import { getGreeting, getTodoCount } from '@/lib/util';

import EmptyTodo from './EmptyTodo';
import styles from './Home.module.css';
import TodoItem from './TodoItem';

const options = [
  { title: 'Oldest', value: 'Oldest' },
  { title: 'Latest', value: 'Latest' },
];

/**
 * Home Page
 */
export default function Home() {
  const name = sessionStorage.getItem('name') ?? 'Anonymous';

  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [order, setOrder] = useState(options[0].value);
  const { showToast } = useToast();

  const fetchData = useCallback(
    async function () {
      const res = await getTasks();
      /** @type {Todo[]} */
      const data = [...res.data];

      // apply sort order
      if (order === 'Latest') {
        data.sort((a, b) => b.createdDate - a.createdDate);
      }

      setTodos(data);
    },
    [order],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ********* SELECTBOX ********** */

  function handleOrderChange(v) {
    setOrder(v);

    if (v === 'Oldest') {
      setTodos(todos.sort((a, b) => a.createdDate - b.createdDate));
    } else {
      setTodos(todos.sort((a, b) => b.createdDate - a.createdDate));
    }
  }

  /* ********** TODOLIST ********** */

  function handleItemClick(id, isDone) {
    if (isDone) return;

    setTodos(
      todos.map(item => {
        if (item.id !== id) return { ...item, isEditing: false };
        return { ...item, isEditing: true };
      }),
    );
  }

  async function handleItemUpdate(id, value) {
    await patchTask(id, { contents: value });
    fetchData();
    showToast('Task has been modified');
  }

  async function handleDoneChange(id, e) {
    const { checked: isDone } = e.target;
    await patchTask(id, { isDone });

    if (isDone) {
      showToast('Task has been completed');
    }

    // Update only client
    setTodos(prev =>
      prev.map(item => {
        if (item.id !== id) return item;
        return { ...item, isDone };
      }),
    );
  }

  async function handleSave() {
    if (!todo) {
      return;
    }

    // save to server
    await postTask({ contents: todo });
    // reload
    fetchData();
    // show toast
    showToast('Task has been registered');

    // clear input area
    setTodo('');
  }

  async function handleDelete(id) {
    await deleteTask(id);
    fetchData();
    showToast('Task has been deleted');
  }

  async function handleClearAll() {
    if (confirm('Are you sure?')) {
      await deleteTasks();
      setTodos([]);
      showToast('All tasks have been deleted');
    }
  }

  /* ********** RENDER ********** */

  return (
    <>
      <Topbar />
      <main className={styles['home-page']}>
        <section className={styles.top}>
          <div className={styles.container}>
            <div className={styles.top__greeting}>
              <p>
                {getGreeting()}, {name}.
              </p>
            </div>
            <div className={styles.top__info}>
              <p>You&apos;ve got</p>
              <h1>{getTodoCount(todos)}</h1>
              <p>task(s) today!</p>
            </div>
            <div className={styles.top__input}>
              <TextField
                type="text"
                placeholder="Enter your task"
                value={todo}
                onUpdate={setTodo}
                onSubmit={handleSave}
              />
            </div>
          </div>
        </section>
        <section className={styles.bottom}>
          {!todos.length ? (
            <EmptyTodo />
          ) : (
            <div className={styles.container}>
              <div className={styles.todo__control}>
                <Dropdown value={order} options={options} onChange={handleOrderChange} />
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
                    onClick={() => handleItemClick(item.id, item.isDone)}
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
    </>
  );
}
