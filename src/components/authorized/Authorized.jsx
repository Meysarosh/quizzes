import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Body, Avatar, LogoContainer, Header, Img } from './Authorized.styles';
import { Logo } from '../logo/Logo';
import { useLocation, useNavigate } from 'react-router';
import { addLocation } from '../../store/slices/userSlice';
import { endQuiz } from '../../store/slices/quizSlice';
import { resetSummary } from '../../store/slices/summarySlice';

export function Authorized({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.token);
  const { user, history } = useSelector((state) => state.user);
  const { quiz } = useSelector((state) => state.quiz);
  const { questions } = useSelector((state) => state.summary);

  useEffect(() => {
    dispatch(addLocation(location.pathname));
  }, [location.pathname, dispatch]);

  useEffect(() => {
    history.length > 1 &&
      quiz.id &&
      !history.at(-1).includes('summary') &&
      (history.at(-2) === `/quiz/${quiz.id}` || history.at(-2) === `/summary/${quiz.id}`) &&
      dispatch(endQuiz());
  }, [history, quiz.id, dispatch]);

  useEffect(() => {
    history.length > 1 &&
      history.at(-2).includes('summary') &&
      !history.at(-1).includes('summary') &&
      questions.length > 0 &&
      dispatch(resetSummary());
  }, [dispatch, history, questions]);

  function handleClickAvatar() {
    quiz.id && dispatch(endQuiz());
    navigate('/profile');
  }

  function handleClickLogo() {
    quiz.id && dispatch(endQuiz());
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
