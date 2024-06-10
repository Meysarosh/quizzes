import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Body } from './Authorized.styles';
import { useLocation, useNavigate } from 'react-router';
import { logout } from '../../store/slices/tokenSlice';
import { login } from '../../store/actions';
import { tokenParse } from '../../utils/helperFunctions/tokenRefresh';
export function Authorized({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { token, refreshToken } = useSelector((state) => state.token);
  const { lastActivity, user } = useSelector((state) => state.user);

  const inactivityTime = 30 * 60 * 1000;

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
      dispatch(logout());
    }, inactivityTime);

    return () => clearTimeout(timeout);
  }, [inactivityTime, dispatch, lastActivity]);

  useEffect(() => {
    if (token) {
      const refreshTimeout = setTimeout(() => {
        dispatch(login({ email: user.email, password: tokenParse(refreshToken) }));
      }, inactivityTime);

      return () => clearTimeout(refreshTimeout);
    }
  }, [token, dispatch, user, refreshToken, inactivityTime]);

  return <Body>{children}</Body>;
}

Authorized.propTypes = {
  children: PropTypes.object,
};
