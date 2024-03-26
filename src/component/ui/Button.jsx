import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

/**
 * Button Component
 * @param {{
 *   variants?: 'primary'|'secondary'|'link',
 * } & React.ComponentPropsWithoutRef<'button'>} param0
 * @returns
 */
function Button({ variants, className, children, ...rest }) {
  return (
    <button
      type="button"
      {...rest}
      className={cn(
        styles.btn,
        {
          [styles['btn--primary']]: variants === 'primary',
          [styles['btn--secondary']]: variants === 'secondary',
          [styles['btn--link']]: variants === 'link',
        },
        className,
      )}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  variants: PropTypes.oneOf(['primary', 'secondary', 'link']),
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
