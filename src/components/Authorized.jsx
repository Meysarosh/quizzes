import { PropTypes } from 'prop-types';
import { Header } from '../styles/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export function Authorized({ children }) {
  const { token } = useSelector((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/');
  }, [token, navigate]);

  return (
    <>
      <Header />
      {children}
    </>
  );
}

Authorized.propTypes = {
  children: PropTypes.object,
};
