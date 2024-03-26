import styles from './DeleteButton.module.css';

/**
 * DeleteButton Component
 * @param {{} & React.ComponentPropsWithoutRef<'button'>} props
 */
function DeleteButton(props) {
  return (
    <button type="button" {...props} className={styles.deleteButton} alt="삭제">
      &#8203;{/* Zero Width Space */}
    </button>
  );
}

export default DeleteButton;
