import { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import styles from './Dropdown.module.css';
import down from '/ic_arrow_down.svg';
import up from '/ic_arrow_up.svg';

function Dropdown({ value, options, onChange }) {
  const [inner, setInner] = useState(value);
  const [isOpen, setOpen] = useState(false);
  const selBox = useRef(null);

  function handleClick(e) {
    e.stopPropagation();
    setOpen(prev => !prev);
  }

  /* for other click */
  useEffect(() => {
    function mouseClickHandler(e) {
      if (selBox.current != e.target) {
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
   * @param {React.MouseEvent<'button'>} e
   * @param {string|number=} v
   */
  function handleOptionClick(e, v) {
    e.stopPropagation();
    onChange?.(v);
    setInner(v);
    setOpen(false);
  }

  return (
    <>
      <div className={styles.dropdown}>
        <div className={styles.dropdown__selected} onClick={handleClick} ref={selBox}>
          <span onClick={handleClick}>{inner ?? ''}</span>
          <img src={isOpen ? up : down} onClick={handleClick} />
        </div>
        {isOpen && (
          <div className={styles.dropdown__over}>
            {options?.map(option => (
              <div key={option.value} onClick={e => handleOptionClick(e, option.value)}>
                {option.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

Dropdown.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) }),
  ),
  onChange: PropTypes.func,
};

export default Dropdown;
