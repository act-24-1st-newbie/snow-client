import cn from 'classnames';
import PropTypes from 'prop-types';

import './TextField.css';
import hov from '/ic_send_hov.svg';
import nor from '/ic_send_nor.svg';

/**
 *
 * @param {{
 * value?: string,
 * showBorder?: boolean,
 * onSend?: React.MouseEventHandler<HTMLButtonElement>,
 * } & React.ComponentPropsWithoutRef<'input'>} param0
 * @returns
 */
function TextField({ value, showBorder, onSend, ...rest }) {
  return (
    <div className="textfield">
      <input
        type="search"
        className={cn('textfield__input', { 'textfield__input--border': showBorder })}
        value={value}
        {...rest}
      />
      <input type="image" className="textfield__send" src={!value ? nor : hov} onClick={onSend} />
    </div>
  );
}

TextField.propTypes = {
  value: PropTypes.string,
  showBorder: PropTypes.bool,
  onSend: PropTypes.func,
};

export default TextField;
