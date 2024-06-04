import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  HeaderContainer,
  Avatar,
  LogoContainer,
  Img,
  Switch,
  SwitchBtn,
  SwitchText,
  LogoutBtn,
  UserContainer,
} from './Header.styles';
import { Logo } from '../logo/Logo';
import { useLocation, useNavigate } from 'react-router';
import { addLocation, setDarkMode } from '../../store/slices/userSlice';
import { endQuiz } from '../../store/slices/quizSlice';
import { resetSummary } from '../../store/slices/summarySlice';
import { switchHighlight, resetHighlight } from '../../store/slices/highlightSlice';
import { BsMoonStars, BsSun } from 'react-icons/bs';
import { isHighlightAvailable } from '../highlight/highlightPages';
import { Tooltip } from '../tooltip';
import { HiOutlineLogout } from 'react-icons/hi';
import { logout } from '../../store/slices/tokenSlice';

export function Header() {
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

  function handleLogout() {
    dispatch(logout());
  }

  return (
    token && (
      <HeaderContainer>
        <LogoContainer onClick={handleClickLogo} title="Home">
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
        <UserContainer>
          <LogoutBtn onClick={handleLogout} title="Logout">
            <HiOutlineLogout />
          </LogoutBtn>
          <Avatar onClick={handleClickAvatar} title="Profile">
            <Img src={user.img ? `/src/assets/img/${user.img}` : '/src/assets/img/default.png'} />
          </Avatar>
        </UserContainer>
      </HeaderContainer>
    )
  );
}
