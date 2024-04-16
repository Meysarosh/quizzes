import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

@font-face {
  font-family: Jost;
  src: url('/src/assets/fonts/Jost/Jost-Regular.woff');
  src: url('/src/assets/fonts/Jost/Jost-Regular.woff2');
}

@font-face {
  font-family: JostSemiBold;
  src: url('/src/assets/fonts/Jost/Jost-SemiBold.woff');
}

@font-face {
  font-family: InterReg;
  src: url('/src/assets/fonts/Inter/Inter-Regular.woff');
  src: url('/src/assets/fonts/Inter/Inter-Regular.woff2');
}

@font-face {
  font-family: InterBold;
  src: url('/src/assets/fonts/Inter/Inter-Bold.woff');
  src: url('/src/assets/fonts/Inter/Inter-Bold.woff2');
}

:root {
  font-size: 16px;
}

* {
  margin: 0;
  box-sizing: border-box;
  font-family: Jost, sans-serif;
}

.hidden {
  display: none;
}

.filter-hidden {
  right: -25%;
}

.menu-disabled {
  color: grey;
}

.rotate-icon {
  transform: rotate(180deg);
}

.checkbox-checked {
  background-color:#dab49d;
}

.border-disabled {
  border-color: grey;
}

.background-disabled {
  background-color: grey;
  
  &:hover {
    background-color: grey;
  }
}

`;
