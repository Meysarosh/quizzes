import App from '../App';
import { Authorized } from '../components/authorized/Authorized';
import {
  RegistrationPage,
  LoginPage,
  HomePage,
  ProfilePage,
  QuizPage,
  NotFoundPage,
} from '../pages';
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
        element: (
          <Authorized>
            <HomePage />
          </Authorized>
        ),
      },
      {
        path: '/profile',
        element: (
          <Authorized>
            <ProfilePage />
          </Authorized>
        ),
      },
      {
        path: '/quiz/:id',
        element: (
          <Authorized>
            <QuizPage />
          </Authorized>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
