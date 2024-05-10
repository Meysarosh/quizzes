import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import {
  Body,
  Avatar,
  LogoContainer,
  Header,
  Img,
  Switch,
  SwitchBtn,
  SwitchText,
} from './Authorized.styles';
import { Logo } from '../logo/Logo';
import { useLocation, useNavigate } from 'react-router';
import { addLocation, setDarkMode } from '../../store/slices/userSlice';
import { endQuiz, switchHighlight } from '../../store/slices/quizSlice';
import { resetSummary } from '../../store/slices/summarySlice';
import { ThemeContext } from '../../styles/ThemeProvider';
import { BsMoonStars, BsSun } from 'react-icons/bs';

export function Authorized({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.token);
  const { user, history, darkMode } = useSelector((state) => state.user);
  const { quiz, highlight } = useSelector((state) => state.quiz);
  const { questions } = useSelector((state) => state.summary);

  const { isNightMode, setIsNightMode } = useContext(ThemeContext);

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
    !history.at(-1).includes('summary') && navigate('/profile');
  }

  function handleClickLogo() {
    navigate('/home');
  }

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  });

  useEffect(() => {
    setIsNightMode(darkMode);
  }, [darkMode, setIsNightMode]);

  function handleSwitchHighlight() {
    dispatch(switchHighlight());
  }

  function handleThemeChange() {
    dispatch(setDarkMode());
  }

  return (
    token && (
      <Body>
        <Header>
          <LogoContainer onClick={handleClickLogo}>
            <Logo />
          </LogoContainer>
          <Switch onClick={handleThemeChange}>
            <BsMoonStars />
            <BsSun />
            <SwitchBtn $nightMode={isNightMode} />
          </Switch>
          {location.pathname.slice(0, 5) === '/quiz' && (
            <Switch onClick={handleSwitchHighlight}>
              <SwitchText>highlight {highlight.isHighlight ? 'on' : 'off'}</SwitchText>
            </Switch>
          )}
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
