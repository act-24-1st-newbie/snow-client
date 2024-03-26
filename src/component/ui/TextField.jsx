import { forwardRef } from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './TextField.module.css';
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
  ({ value, hideBorder, onSend, ...rest }, ref) => {
    return (
      <div className={styles.textfield}>
        <input
          type="search"
          {...rest}
          className={cn(styles.textfield__input, { [styles['textfield__input--border']]: !hideBorder })}
          value={value}
          ref={ref}
        />
        <input type="image" className={styles.textfield__send} src={!value ? nor : hov} onClick={onSend} />
      </div>
    );
  },
);

TextField.displayName = 'TextField';

TextField.propTypes = {
  value: PropTypes.string,
  hideBorder: PropTypes.bool,
  onSend: PropTypes.func,
};

export default TextField;
