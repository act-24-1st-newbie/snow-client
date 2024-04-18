import { forwardRef, useImperativeHandle, useRef } from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './TextField.module.css';
import chk from '/btn_check.svg';
import del from '/ic_delete.svg';

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

    useImperativeHandle(
      ref,
      () => {
        return {
          focus() {
            inputRef.current.focus();
          },
          validate() {
            return _validate(type, value);
          },
        };
      },
      [type, value],
    );

    /* 글자가 변경되면 상위 컴포넌트로 전달 */
    function handleChange(e) {
      onUpdate?.(e.target.value);
    }

    /* Clear버튼 클릭 이벤트 */
    function handleClearClick() {
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
      <div className={styles.outerTextField}>
        <div className={styles.textfield}>
          <div className={styles.textfield__wrap}>
            <input
              type="text"
              className={cn(styles.textfield__input, {
                [styles['textfield__input--border']]: !hideBorder,
                [styles['textfield__input--error']]: status === 2,
              })}
              value={value}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              ref={inputRef}
              {...inputProps}
            />
            <input
              type="image"
              src={del}
              className={cn(styles.textfield__clear)}
              onClick={handleClearClick}
              data-show={!!value}
            />
          </div>
          {type === 'text' ? (
            !hideButton && (
              <button type="image" className={styles.textfield__send} onClick={handleClick} disabled={!value}>
                {'\u200B'}
              </button>
            )
          ) : (
            <button type="button" className={styles.textfield__check} onClick={handleClick}>
              {status === 1 ? <img src={chk} /> : 'Check'}
            </button>
          )}
        </div>
        <div
          className={cn(styles.textfield__message, {
            [styles.messageHide]: status === 3,
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
