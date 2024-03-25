import { Outlet } from 'react-router';

import './App.css';
import Topbar from './component/Topbar';

function App() {
  return (
    <>
      <Topbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
