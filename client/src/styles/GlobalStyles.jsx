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

body {
  background-color: ${(props) => props.theme.colors.mainBackground};
}

.hidden {
  display: none;
}

.invisible {
  height:0;
  opacity: 0;
  overflow: hidden;
}
.visible {
  height:3.5rem;
  opacity: 1;
}

.transparent {
  opacity: 0;
}

.filter-hidden {
  right: -25%;
}

.menu-disabled {
  color: #a7a7a7;
}

.rotate-icon {
  transform: rotate(180deg);
}

.checkbox-checked {
  background-color:#dab49d;
}

.border-disabled {
  border-color: #a7a7a7;
}

.background-disabled {
  background-color: #a7a7a7;
  
  &:hover {
    background-color: #a7a7a7;
  }
}

.green {
  color: #008000;
}

.red {
  color: #ff0000 !important;
}

.yellow {
  color: #ffcc00
}

.highlighted {
  background-color: #ffff00;
  color: #000000;
}

.tooltip-top {
  bottom: calc(100% + 1rem);
  right: 50%;

  &::after{
    top:100%;
    left: 50%;
    transform: translateX(-50%);
    border-color: #dab49d transparent transparent transparent;
  }
}

.tooltip-bottom {
  top: calc(100% + 1rem);
  right: 50%;

  &::after{
    bottom:100%;
    left: 50%;
    transform: translateX(-50%);
    border-color:  transparent transparent #dab49d transparent;
  }
}

.tooltip-right{
  left: calc(100% + 1rem);
  top: -50%;
  transform: translateX(0);

  &::after{
    right:100%;
    bottom: 50%;
    transform: translateY(50%);
    border-color:  transparent #dab49d transparent  transparent;
  }
}

.tooltip-left{
  right: calc(100% + 1rem);
  top: -50%;
  transform: translateX(0);

  &::after{
    left:100%;
    bottom: 50%;
    transform: translateY(50%);
    border-color:  transparent transparent  transparent #dab49d ;
  }
}

@keyframes rotates {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.rotating {
  animation: 2s linear infinite rotates;
  /* animation-duration: 2s;
  animation-name: rotates;
  animation-iteration-count: infinite; */

}

`;
