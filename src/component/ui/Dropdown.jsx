import { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import styles from './Dropdown.module.css';
import down from '/ic_arrow_down.svg';
import up from '/ic_arrow_up.svg';

/**
 * @typedef DropdownProps
 * @prop {string|number=} value
 * @prop {{title: string; value?: string|number}[]} options
 * @prop {(value?: string) => void} onChange
 */

/**
 * Dropdown component
 * @component
 * @param {DropdownProps} param0
 * @returns
 */
function Dropdown({ value, options, onChange }) {
  const [inner, setInner] = useState(value);
  const [isOpen, setOpen] = useState(false);

  /** @type {React.MutableRefObject<HTMLDivElement>} */
  const selBox = useRef(null);

  /** @param {React.MouseEvent<HTMLDivElement>} e */
  function handleClick(e) {
    e.stopPropagation();
    setOpen(prev => !prev);
  }

  /* for other click */
  useEffect(() => {
    /** @param {MouseEvent} e */
    function mouseClickHandler(e) {
      if (!selBox.current.contains(e.target)) {
        setOpen(false);
      }
    }

    addEventListener('click', mouseClickHandler);

    return () => {
      removeEventListener('click', mouseClickHandler);
    };
  }, []);

  useEffect(() => {
    setInner(value);
  }, [setInner, value]);

  /**
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e
   * @param {string|number=} v
   */
  function handleOptionClick(e, v) {
    e.stopPropagation();
    onChange?.(v);
    setInner(v);
    setOpen(false);
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdown__selected} onClick={handleClick} ref={selBox}>
        <span onClick={handleClick}>{inner ?? ''}</span>
        <img src={isOpen ? up : down} onClick={handleClick} />
      </div>
      {isOpen && (
        <ul className={styles.dropdown__over}>
          {options?.map(option => (
            <li key={option.value} onClick={e => handleOptionClick(e, option.value)}>
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const Option = PropTypes.shape({
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

Dropdown.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.arrayOf(Option),
  onChange: PropTypes.func,
};

export default Dropdown;
