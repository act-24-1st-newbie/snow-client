import styles from './CheckBox.module.css';

export default function Checkbox(props) {
  return <input type="checkbox" {...props} className={styles.checkbox} />;
}
