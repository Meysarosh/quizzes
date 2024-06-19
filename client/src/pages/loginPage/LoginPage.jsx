import { Link } from 'react-router-dom';
import { AuthMain, AuthTitle, FormContainer } from './LoginPage.styles';
import { LoginForm } from './components/LoginForm';
import { Auth0LoginBtn } from '../../components/Auth0/Auth0LoginBtn';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser, login } from '../../store/actions';

export function LoginPage() {
  ////////////////////////////////////////////////////////////////////////////
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const { isAuth0 } = useSelector((state) => state.user);
  const [auth0User, setAuth0User] = useState(null);

  useEffect(() => {
    if (user && isAuth0) {
      setAuth0User({
        fullname: user.name,
        email: user.email,
        username: user.nickname,
        password: user.email.split('').reverse().join(''),
        img: user.picture,
      });
    }
  }, [user, isAuth0]);

  useEffect(() => {
    isAuth0 &&
      auth0User &&
      dispatch(login({ email: auth0User.email, password: auth0User.password })).then((res) => {
        if (res.payload === 'Cannot find user') dispatch(createNewUser(auth0User));
      });
  }, [isAuth0, auth0User, dispatch]);
  ////////////////////////////////////////////////////////////////////////////////

  return (
    <AuthMain>
      <AuthTitle>Login</AuthTitle>
      <FormContainer>
        <LoginForm />
        <Auth0LoginBtn />
        <Link to="/registration">Not registered yet? Click to Sing Up!</Link>
      </FormContainer>
    </AuthMain>
  );
}
