import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  HeaderContainer,
  Avatar,
  LogoContainer,
  Img,
  Switch,
  SwitchBtn,
  SwitchText,
  LogoutBtn,
  ProfileContainer,
} from './Header.styles';
import { Logo } from '../logo/Logo';
import { useLocation, useNavigate } from 'react-router';
import {
  addLocation,
  setDarkMode,
  setIsAuth0,
  setIsRedirecting,
} from '../../store/slices/userSlice';
import { endQuiz } from '../../store/slices/quizSlice';
import { resetSummary } from '../../store/slices/summarySlice';
import { switchHighlight, resetHighlight } from '../../store/slices/highlightSlice';
import { BsMoonStars, BsSun } from 'react-icons/bs';
import { isHighlightAvailable } from '../highlight/highlightPages';
import { Tooltip } from '../tooltip';
import { HiOutlineLogout } from 'react-icons/hi';
import { logout as logoutJSA } from '../../store/slices/tokenSlice';
import { useAuth0 } from '@auth0/auth0-react';

export function Header() {
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.token);
  const { user, history, darkMode, isAuth0 } = useSelector((state) => state.user);
  const { quiz } = useSelector((state) => state.quiz);
  const { questions } = useSelector((state) => state.summary);
  const { highlight } = useSelector((state) => state.highlight);

  const [userImg, setUserImg] = useState(null);

  useEffect(() => {
    user?.img
      ? setUserImg(user.img.includes('http') ? user.img : `/src/assets/img/${user.img}`)
      : setUserImg('/src/assets/img/default.png');
  }, [user]);

  useEffect(() => {
    dispatch(addLocation(location.pathname));
  }, [location.pathname, dispatch]);

  useEffect(() => {
    dispatch(setIsRedirecting(false));
  }, [location.pathname, dispatch]);

  useEffect(() => {
    history.at(-1) !== history.at(-2) &&
      !history.at(-1).includes('summary') &&
      dispatch(resetHighlight());
  }, [history, dispatch]);

  useEffect(() => {
    location.pathname === history.at(-1) &&
      history.length > 1 &&
      quiz.id &&
      !history.at(-1).includes('summary') &&
      (history.at(-2) === `/quiz/${quiz.id}` || history.at(-2) === `/summary/${quiz.id}`) &&
      !history.at(-1).includes('quiz') &&
      dispatch(endQuiz());
  }, [history, quiz.id, location.pathname, dispatch]);

  useEffect(() => {
    location.pathname === history.at(-1) &&
      history.length > 2 &&
      history.at(-1).includes('quiz') &&
      history.at(-2).includes('quiz') &&
      history.at(-1) !== history.at(-2) &&
      dispatch(endQuiz());
  }, [history, location.pathname, dispatch]);

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

  async function handleLogout() {
    if (isAuth0) {
      dispatch(setIsAuth0());
    }
    dispatch(logoutJSA());
    logout();
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
        <ProfileContainer>
          <LogoutBtn onClick={handleLogout} title="Logout">
            <HiOutlineLogout />
          </LogoutBtn>
          <Avatar onClick={handleClickAvatar} title="Profile">
            <Img src={userImg} />
          </Avatar>
        </ProfileContainer>
      </HeaderContainer>
    )
  );
}
