import { Link } from 'react-router-dom';

import { format } from 'date-fns';

import './Topbar.css';
import Button from './ui/Button';
import topbarMenu from '/ic_topbar_menu.svg';

function Topbar() {
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
        <Button variants="secondary" className="topbar__signup">
          Sign Up
        </Button>
      </div>
    </header>
  );
}

export default Topbar;
