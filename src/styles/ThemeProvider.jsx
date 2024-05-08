import { ThemeProvider as ScThemeProvider } from 'styled-components';
import { PropTypes } from 'prop-types';
import { createContext, useState } from 'react';
import { theme } from '../utils/const/selectStyles';

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
  font: {},
};

const nigthTheme = {
  colors: {
    backgroundColorMedium: '#faf0e6',
    backgroundColorDark: '#00000030',
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
  font: {},
};

theme.colors = { ...dayTheme.colors };

export const ThemeContext = createContext(false);

export const ThemeProvider = ({ children }) => {
  const [nightMode, setNightMode] = useState(false);

  if (nightMode) theme.colors = { ...nigthTheme.colors };
  else theme.colors = { ...dayTheme.colors };

  return (
    <ThemeContext.Provider value={{ nightMode, setNightMode }}>
      <ScThemeProvider theme={nightMode ? nigthTheme : dayTheme}>{children}</ScThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.object,
};
