import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

function Button({ variants, children, ...rest }) {
  return (
    <button
      {...rest}
      className={cn(styles.btn, {
        [styles['btn--primary']]: variants === 'primary',
        [styles['btn--secondary']]: variants === 'secondary',
        [styles['btn--link']]: variants === 'link',
      })}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  variants: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
