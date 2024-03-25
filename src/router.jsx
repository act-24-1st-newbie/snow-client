import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Test from './pages/Test';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'test',
        element: <Test />,
      },
    ],
  },
]);

export default router;
