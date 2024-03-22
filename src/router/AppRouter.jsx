import App from '../App';
import { RegistrationPage, LoginPage } from '../pages';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: '/registration',
        element: <RegistrationPage />,
      },
      {
        path: '/home',
        element: <h1>Home</h1>,
      },
      {
        path: '/profile',
        element: <h1>Profile</h1>,
      },
      {
        path: '/quiz',
        element: <h1>Enroll Quiz</h1>,
      },
      {
        path: '*',
        element: <h1>Not Found</h1>,
      },
    ],
  },
]);

export default router;
