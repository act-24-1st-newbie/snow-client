import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './TextField.module.css';
import del from '/ic_delete.svg';
import hov from '/ic_send_hov.svg';
import nor from '/ic_send_nor.svg';

/**
 * TextField Component
 */
const TextField = forwardRef(
  /**
   * @param {{
   *  hideBorder?: boolean,
   *  onSend?: React.MouseEventHandler<HTMLButtonElement>,
   * } & React.ComponentPropsWithRef<'input'>} param0
   * @returns
   */
  ({ value, hideBorder, onSend, onChange, ...rest }, ref) => {
    const inputRef = useRef(null);

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

    const isClearVisible = useMemo(() => value.length, [value]);
    const [innerValue, setInnerValue] = useState('');
    useEffect(() => {
      setInnerValue(value);
    }, [value]);

    function handleChange(e) {
      setInnerValue(e.target.value);
      onChange?.(e);
    }

    function handleClearClick() {
      setInnerValue('');
      onChange?.({ target: inputRef.current });
      inputRef.current.focus();
    }

    return (
      <div className={styles.textfield}>
        <div className={styles.textfield__wrap}>
          <input
            type="text"
            {...rest}
            className={cn(styles.textfield__input, { [styles['textfield__input--border']]: !hideBorder })}
            value={innerValue}
            onChange={handleChange}
            ref={inputRef}
          />
          <input
            type="image"
            src={del}
            className={cn(styles.textfield__clear, { [styles['textfield__clear--show']]: isClearVisible })}
            onClick={handleClearClick}
          />
        </div>
        <input type="image" className={styles.textfield__send} src={!innerValue ? nor : hov} onClick={onSend} />
      </div>
    );
  },
);

TextField.displayName = 'TextField';

TextField.propTypes = {
  value: PropTypes.string,
  hideBorder: PropTypes.bool,
  onSend: PropTypes.func,
  onChange: PropTypes.func,
};

export default TextField;
