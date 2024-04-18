import { Link } from 'react-router-dom';

import { format } from 'date-fns';
import PropTypes from 'prop-types';

import './Topbar.css';
import topbarMenu from '/ic_topbar_menu.svg';

function Topbar({ children }) {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <Link className="topbar__menu" to="/">
          <img src={topbarMenu} alt="topbar-menu" />
        </Link>
        <Link className="topbar__title" to="/">
          My Todo
        </Link>
      </div>
      <div className="topbar__right">
        <div className="topbar__date">{format(new Date(), 'MM/dd (EEE)')}</div>
        {children}
      </div>
    </header>
  );
}

Topbar.propTypes = {
  children: PropTypes.node,
};

export default Topbar;
