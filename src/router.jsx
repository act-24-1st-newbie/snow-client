import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';
import Test from './pages/Test';

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
