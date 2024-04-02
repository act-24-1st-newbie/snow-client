import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import ErrorBoundary from './component/ErrorBoundary';
import Home from './pages/home/Home';
import Login from './pages/login/Login2';
import Signup from './pages/signup/Signup';
import Test from './pages/test/Test';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
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
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'test',
        element: <Test />,
      },
    ],
  },
]);

export default router;
