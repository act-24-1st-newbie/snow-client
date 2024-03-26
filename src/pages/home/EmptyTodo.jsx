import styles from './EmptyTodo.module.css';
import emptyImg from '/illust_empty.png';

/**
 * EmptyTodo Component
 */
export default function EmptyTodo() {
  return (
    <div className={styles.empty}>
      <img src={emptyImg} />
      <p>There is no task registerd.</p>
    </div>
  );
}
