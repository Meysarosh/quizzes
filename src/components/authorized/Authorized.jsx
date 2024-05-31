import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
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
import { endQuiz } from '../../store/slices/quizSlice';
import { resetSummary } from '../../store/slices/summarySlice';
import { switchHighlight, resetHighlight } from '../../store/slices/highlightSlice';
import { BsMoonStars, BsSun } from 'react-icons/bs';
import { isHighlightAvailable } from '../highlight/highlightPages';
import { Tooltip } from '../tooltip';

export function Authorized({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.token);
  const { user, history, darkMode } = useSelector((state) => state.user);
  const { quiz } = useSelector((state) => state.quiz);
  const { questions } = useSelector((state) => state.summary);
  const { highlight } = useSelector((state) => state.highlight);

  useEffect(() => {
    dispatch(addLocation(location.pathname));
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    history.at(-1) !== history.at(-2) &&
      !history.at(-1).includes('summary') &&
      dispatch(resetHighlight());
  }, [history, dispatch]);

  useEffect(() => {
    history.length > 1 &&
      quiz.id &&
      !history.at(-1).includes('summary') &&
      (history.at(-2) === `/quiz/${quiz.id}` || history.at(-2) === `/summary/${quiz.id}`) &&
      !history.at(-1).includes('quiz') &&
      dispatch(endQuiz());
  }, [history, quiz.id, dispatch]);

  useEffect(() => {
    history.length > 2 &&
      history.at(-1).includes('quiz') &&
      history.at(-2).includes('quiz') &&
      history.at(-1) !== history.at(-2) &&
      dispatch(endQuiz());
  }, [history, dispatch]);

  useEffect(() => {
    history.length > 1 &&
      history.at(-2).includes('summary') &&
      !history.at(-1).includes('summary') &&
      questions.length > 0 &&
      dispatch(resetSummary());
  }, [dispatch, history, questions]);

  function handleClickAvatar() {
    !history.at(-1).includes('summary') && navigate('/profile');
    history.at(-1).includes('summary') && dispatch(endQuiz()) && navigate('/profile');
  }

  function handleClickLogo() {
    navigate('/home');
  }

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
          <Tooltip text={`switch to ${darkMode ? 'light' : 'dark'} mode`} position="right">
            <Switch onClick={handleThemeChange} className="theme_switch">
              <BsMoonStars />
              <BsSun />
              <SwitchBtn $nightMode={darkMode} />
            </Switch>
          </Tooltip>
          {isHighlightAvailable(location.pathname) && (
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
