import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './TextField.module.css';
import chk from '/btn_check.svg';
import del from '/ic_delete.svg';
import hov from '/ic_send_hov.svg';
import nor from '/ic_send_nor.svg';

/**
 * @typedef TextFieldProps
 * @prop {'text'|'email'=} type
 * @prop {boolean=} hideBorder
 * @prop {boolean=} hideButton
 * @prop {number=} status
 * @prop {string=} statusMsg
 * @prop {(value?: string) => void} onUpdate
 * @prop {() => void} onSubmit
 */

/**
 * Validate Function
 * @param {'text'|'email} type
 * @param {string} str
 * @returns {bool}
 */
function _validate(type, str) {
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
   * Component
   * @param {TextFieldProps & React.ComponentPropsWithoutRef<'input'>}
   * @param {React.ForwardedRef<HTMLInputElement>} ref
   * @returns
   */
  ({ type, value, hideBorder, hideButton, status, statusMsg, onUpdate, onSubmit, ...rest }, ref) => {
    // eslint-disable-next-line
    const { className, onChange, ...inputProps } = rest;

    /** @type {React.MutableRefObject<null|HTMLInputElement>} */
    const inputRef = useRef(null);
    const [inner, setInner] = useState(value);

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
          validate() {
            return _validate(type, inner);
          },
        };
      },
      [type, inner],
    );

    /* 글자가 변경되면 상위 컴포넌트로 전달 */
    function handleChange(e) {
      setInner(e.target.value);
      onUpdate?.(e.target.value);
    }

    /* Clear버튼 클릭 이벤트 */
    function handleClearClick() {
      setInner('');
      onUpdate?.('');
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

    return (
      <div>
        <div className={styles.textfield}>
          <div className={styles.textfield__wrap}>
            <input
              type="text"
              className={cn(styles.textfield__input, {
                [styles['textfield__input--border']]: !hideBorder,
                [styles['textfield__input--error']]: status === 2,
              })}
              value={inner}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              ref={inputRef}
              {...inputProps}
            />
            <input
              type="image"
              src={del}
              className={cn(styles.textfield__clear, { [styles['textfield__clear--show']]: inner })}
              onClick={handleClearClick}
            />
          </div>
          {type === 'text' ? (
            !hideButton && (
              <input
                type="image"
                className={styles.textfield__send}
                src={!inner ? nor : hov}
                onClick={handleClick}
                value={'\u200B'}
              />
            )
          ) : (
            <button type="button" className={styles.textfield__check} onClick={handleClick}>
              {status === 1 ? <img src={chk} /> : 'Check'}
            </button>
          )}
        </div>
        <div
          className={cn(styles.textfield__message, {
            [styles['textfield__message--error']]: status === 2,
            [styles['textfield__message--valid']]: status === 1,
          })}
        >
          <span>{statusMsg || `Invalid ${type} format`}</span>
        </div>
      </div>
    );
  },
);

TextField.displayName = 'TextField';

TextField.propTypes = {
  type: PropTypes.oneOf(['text', 'email']).isRequired,
  hideBorder: PropTypes.bool,
  hideButton: PropTypes.bool,
  status: PropTypes.number,
  statusMsg: PropTypes.string,
  onUpdate: PropTypes.func,
  onSubmit: PropTypes.func,

  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default TextField;
