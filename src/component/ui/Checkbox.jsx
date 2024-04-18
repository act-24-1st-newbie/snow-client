import styles from './CheckBox.module.css';

/**
 * Checkbox Component
 * @param {React.ComponentPropsWithoutRef<'input'>} props
 * @returns
 */
export default function Checkbox(props) {
  return <input type="checkbox" {...props} className={styles.checkbox} />;
}
