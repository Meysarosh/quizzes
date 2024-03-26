import { ThemeProvider as ScThemeProvider } from 'styled-components';
import { PropTypes } from 'prop-types';

const theme = {
  colors: {
    backgroundColorMedium: '#faf0e6',
    backgroundColorDark: '#00000030',
    cardBackgroundColor: '#d9d9d9',
    inputFieldColor: ' #d6d6d6',
    textColorBrown: '#5e30237a',

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

export const ThemeProvider = ({ children }) => {
  return <ScThemeProvider theme={theme}>{children}</ScThemeProvider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.object,
};
