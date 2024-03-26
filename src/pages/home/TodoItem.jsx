import { useEffect } from 'react';

import cn from 'classnames';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Checkbox from '@/component/ui/Checkbox';
import DeleteButton from '@/component/ui/DeleteButton';
import TextField from '@/component/ui/TextField';
import { useInput } from '@/lib/useInput';

import styles from './TodoItem.module.css';

/**
 * TodoItem Component
 * @param {{
 * item: Todo,
 * isEditing: boolean,
 * onClick: React.MouseEventHandler<HTMLButtonElement>
 * onUpdate: (value) => {}
 * onDoneChange: React.ChangeEventHandler<HTMLInputElement>
 * onDelete: React.MouseEventHandler<HTMLButtonElement>
 * }} param0
 */
function TodoItem({ item, isEditing, onClick, onUpdate, onDoneChange, onDelete }) {
  const { contents, isDone, createdDate } = item;
  const [contentsProps, setContents] = useInput(contents, handleUpdate);

  useEffect(() => {
    if (isEditing) {
      setContents(contents);
    }
  }, [setContents, contents, isEditing]);

  function handleUpdate() {
    if (contentsProps.value) {
      onUpdate?.(contentsProps.value);
    }
  }

  if (isEditing) {
    return (
      <li className={cn(styles.todo__item, styles['todo__item--active'])}>
        <TextField hideBorder {...contentsProps} onSend={handleUpdate} />
      </li>
    );
  }

  return (
    <li className={styles.todo__item}>
      <Checkbox checked={isDone} onChange={onDoneChange} />
      <span className={cn(styles.todo__content, { [styles['todo__content--done']]: isDone })} onClick={onClick}>
        {contents}
      </span>
      <span>{format(createdDate, 'MM/dd HH:mm')}</span>
      <DeleteButton onClick={onDelete} />
    </li>
  );
}

TodoItem.propTypes = {
  item: PropTypes.object,
  isEditing: PropTypes.bool,
  onClick: PropTypes.func,
  onUpdate: PropTypes.func,
  onDoneChange: PropTypes.func,
  onDelete: PropTypes.func,
};

export default TodoItem;
