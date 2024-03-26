import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Body, Avatar, Logo, Header } from './Authorized.styles';

export function Authorized({ children }) {
  const { token } = useSelector((state) => state.token);
  const navigate = useNavigate();

  function handleClickAvatar() {
    navigate('/profile');
  }

  function handleClickLogo() {
    navigate('/home');
  }

  useEffect(() => {
    if (!token) navigate('/');
  }, [token, navigate]);

  return (
    <Body>
      <Header>
        <Logo onClick={handleClickLogo} />
        <Avatar $img="src/assets/img/default.png" onClick={handleClickAvatar} />
      </Header>
      {children}
    </Body>
  );
}

Authorized.propTypes = {
  children: PropTypes.object,
};
