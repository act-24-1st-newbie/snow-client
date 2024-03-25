import { createBrowserRouter } from 'react-router-dom';

import App from './App';
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
        path: 'test',
        element: <Test />,
      },
    ],
  },
]);

export default router;
