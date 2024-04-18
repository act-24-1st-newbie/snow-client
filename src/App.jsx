import { Outlet } from 'react-router';

import './App.css';
import Toast from './component/ui/Toast';

function App() {
  return (
    <>
      <Outlet />
      <Toast />
    </>
  );
}

export default App;
