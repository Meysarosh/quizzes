import styled from 'styled-components';

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  color: ${(props) => props.theme.colors.caramel};
  opacity: 0.3;
`;

export const Centered = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #ffffff4d; */
`;
