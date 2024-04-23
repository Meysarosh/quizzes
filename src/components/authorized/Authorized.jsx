import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Body, Avatar, LogoContainer, Header, Img } from './Authorized.styles';
import { Logo } from '../logo/Logo';
import { useLocation, useNavigate } from 'react-router';
import { addLocation } from '../../store/slices/userSlice';
import { endQuiz } from '../../store/slices/quizSlice';

export function Authorized({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.token);
  const { user, history } = useSelector((state) => state.user);
  const { quiz } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(addLocation(location.pathname));
  }, [location.pathname, dispatch]);

  useEffect(() => {
    history.length > 1 && history.at(-2) === `/quiz/${quiz.id}` && dispatch(endQuiz());
  }, [history, quiz.id, dispatch]);

  function handleClickAvatar() {
    navigate('/profile');
  }

  function handleClickLogo() {
    navigate('/home');
  }

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  });

  return (
    token && (
      <Body>
        <Header>
          <LogoContainer onClick={handleClickLogo}>
            <Logo />
          </LogoContainer>
          <Avatar onClick={handleClickAvatar}>
            <Img src={user.img ? `/src/assets/img/${user.img}` : '/src/assets/img/default.png'} />
          </Avatar>
        </Header>
        {children}
      </Body>
    )
  );
}

Authorized.propTypes = {
  children: PropTypes.object,
};
