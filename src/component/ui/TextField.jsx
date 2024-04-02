import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './TextField.module.css';
import del from '/ic_delete.svg';
import hov from '/ic_send_hov.svg';
import nor from '/ic_send_nor.svg';

/**
 * Validate Function
 * @param {'text'|'email} type
 * @param {string} str
 * @returns {bool}
 */
function validate(type, str) {
  if (!str) return true;

  if (type === 'text') {
    return str.match(/^[\w\d\s.,?@!\\'\\"]*$/)?.length;
  } else if (type === 'email') {
    return str.match(/^[\w\d.]+[@][\w\d]+[.][\w\d]+$/)?.length;
  }
  return true;
}

/**
 * TextField Component
 */
const TextField = forwardRef(
  /**
   * @param {{
   *  type: 'text'|'email',
   *  hideBorder?: boolean,
   *  onUpdate: (value: string) => {},
   *  onSubmit: () => {},
   * } & React.ComponentPropsWithRef<'input'>} param0
   * @returns
   */
  ({ type, value, hideBorder, onUpdate, onSubmit, ...rest }, ref) => {
    const inputRef = useRef(null);
    const [inner, setInner] = useState('');
    useEffect(() => {
      setInner(value);
    }, [value]);

    useImperativeHandle(
      ref,
      () => {
        return {
          focus() {
            inputRef.current.focus();
          },
        };
      },
      [],
    );

    /* 글자가 변경되면 상위 컴포넌트로 전달 */
    function handleChange(e) {
      setInner(e.target.value);
      onUpdate?.(e.target.value);
    }

    /* KeyUp 또는 Submit버튼이 눌리면 상위 컴포넌트에 이벤트 전달 */
    function handleKeyUp(e) {
      if (e.key === 'Enter') {
        onSubmit?.();
      }
    }

    function handleClick() {
      onSubmit?.();
    }

    function handleClearClick() {
      setInner('');
      onUpdate?.('');
    }

    return (
      <div>
        <div className={styles.textfield}>
          <div className={styles.textfield__wrap}>
            <input
              type="text"
              {...rest}
              className={cn(styles.textfield__input, {
                [styles['textfield__input--border']]: !hideBorder,
                [styles['textfield__input--error']]: !validate(type, inner),
              })}
              value={inner}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              ref={inputRef}
            />
            <input
              type="image"
              src={del}
              className={cn(styles.textfield__clear, { [styles['textfield__clear--show']]: inner })}
              onClick={handleClearClick}
            />
          </div>
          {type === 'text' ? (
            <input
              type="image"
              className={styles.textfield__send}
              src={!inner ? nor : hov}
              onClick={handleClick}
              value={'\u200B'}
            />
          ) : (
            <button className={styles.textfield__check}>Check</button>
          )}
        </div>
        <div
          className={cn(styles.textfield__message, {
            [styles['textfield__message--visible']]: !validate(type, inner),
          })}
        >
          <span>Invalid {type} format</span>
        </div>
      </div>
    );
  },
);

TextField.displayName = 'TextField';

TextField.propTypes = {
  type: PropTypes.oneOf(['text', 'email']).isRequired,
  value: PropTypes.string,
  hideBorder: PropTypes.bool,
  onUpdate: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default TextField;
