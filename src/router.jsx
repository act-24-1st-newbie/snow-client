import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Test from './pages/test/Test';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Login />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'test',
        element: <Test />,
      },
    ],
  },
]);

export default router;
