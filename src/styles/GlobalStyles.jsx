import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

:root {
  font-size: 16px;
  --background-color-medium: #faf0e6;
  --background-color-dark: #00000030;
  --input-field-color: #d6d6d6;
  --input-text-color: #5e3023;
  --input-label-color: #895737;
  --button-color: #c08552;
  --button-color-hover: #ca6813;
  --button-color-active: #ca3413;
  --button-text-color: #f3e9dc;
  --text-color-brown: #5e30237a;
}

body {
    margin: 0;
    box-sizing: border-box;
  }

`;
