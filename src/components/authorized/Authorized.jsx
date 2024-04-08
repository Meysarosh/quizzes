import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Body, Avatar, Logo, Header } from './Authorized.styles';
import { push, go } from 'redux-first-history';

export function Authorized({ children }) {
  const { token } = useSelector((state) => state.token);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleClickAvatar() {
    dispatch(push('/profile'));
    dispatch(go());
  }

  function handleClickLogo() {
    dispatch(push('/home'));
    dispatch(go());
  }

  useEffect(() => {
    if (!token) {
      dispatch(push('/'));
      dispatch(go());
    }
  });

  return (
    token && (
      <Body>
        <Header>
          <Logo onClick={handleClickLogo} />
          <Avatar
            $img={user.img ? `src/assets/img/${user.img}` : 'src/assets/img/default.png'}
            onClick={handleClickAvatar}
          />
        </Header>
        {children}
      </Body>
    )
  );
}

Authorized.propTypes = {
  children: PropTypes.object,
};
