import { ThemeProvider as ScThemeProvider } from 'styled-components';
import { PropTypes } from 'prop-types';
import { theme } from './selectStyles';
import { useSelector } from 'react-redux';

const dayTheme = {
  colors: {
    backgroundColorMedium: '#faf0e6',
    backgroundColorDark: '#00000030',
    cardBackgroundColor: '#d9d9d9',
    inputFieldColor: ' #d6d6d6',
    textColorBrown: '#5e30237a',
    mainBackground: '#fff',
    text: '#000',
    caputMortuum: '#5e3023',
    rawUmber: '#895737',
    caramel: '#c08552',
    caramelSuccess: '#ca6813',
    caramelDanger: '#ca3413',
    linen: '#f3e9dc',
    desertSand: '#dab49d',
  },
};

const nigthTheme = {
  colors: {
    backgroundColorMedium: '#2d2d2d',
    backgroundColorDark: '#695651',
    cardBackgroundColor: '#4b4b4b',
    inputFieldColor: ' #4b4b4b',
    textColorBrown: '#f3e9dc',
    mainBackground: '#2d2d2d',
    text: '#c0c0c0',
    caputMortuum: '#f3e9dc',
    rawUmber: '#dab49d',
    caramel: '#dab49d',
    caramelSuccess: '#f5a762',
    caramelDanger: '#ca3413',
    linen: '#695651',
    desertSand: '#dab49d',
  },
};

theme.colors = { ...dayTheme.colors };

export const ThemeProvider = ({ children }) => {
  const { darkMode } = useSelector((state) => state.user);

  if (darkMode) theme.colors = { ...nigthTheme.colors };
  else theme.colors = { ...dayTheme.colors };

  return <ScThemeProvider theme={darkMode ? nigthTheme : dayTheme}>{children}</ScThemeProvider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.object,
};
