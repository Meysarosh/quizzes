import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Body } from './Authorized.styles';
import { useLocation, useNavigate } from 'react-router';
import { logout as logoutJSA } from '../../store/slices/tokenSlice';
import { login } from '../../store/actions';
import { tokenParse } from '../../utils/helperFunctions/tokenRefresh';
import { setIsRefreshing, setIsAuth0 } from '../../store/slices/userSlice';
import { useAuth0 } from '@auth0/auth0-react';

const inactivityTime = 60 * 30 * 1000;

export function Authorized({ children }) {
  const { logout } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { token, refreshToken } = useSelector((state) => state.token);
  const { lastActivity, user, isAuth0 } = useSelector((state) => state.user);

  useEffect(() => {
    if (!token && location.pathname !== '/registration') {
      navigate('/');
    }
  }, [token, navigate, location.pathname]);

  useEffect(() => {
    (location.pathname === '/' || location.pathname === '/registration') &&
      token &&
      navigate('/home');
  }, [token, navigate, location]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (token) {
        if (isAuth0) {
          dispatch(setIsAuth0());
        }
        dispatch(logoutJSA());
        logout();
      }
    }, inactivityTime);

    return () => clearTimeout(timeout);
  }, [dispatch, lastActivity, isAuth0, logout, token]);

  useEffect(() => {
    if (token) {
      const refreshTimeout = setTimeout(() => {
        dispatch(setIsRefreshing());
        dispatch(login({ email: user.email, password: tokenParse(refreshToken) })).then(() =>
          dispatch(setIsRefreshing())
        );
      }, inactivityTime + 1000);

      return () => clearTimeout(refreshTimeout);
    }
  }, [token, dispatch, user, refreshToken]);

  return <Body>{children}</Body>;
}

Authorized.propTypes = {
  children: PropTypes.object,
};
