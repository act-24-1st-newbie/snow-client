import styles from './DeleteButton.module.css';

function DeleteButton(props) {
  return (
    <button type="button" {...props} className={styles.deleteButton} alt="삭제">
      &#8203;{/* Zero Width Space */}
    </button>
  );
}

export default DeleteButton;
