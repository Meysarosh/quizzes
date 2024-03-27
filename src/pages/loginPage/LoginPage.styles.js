import styled from 'styled-components';

const AuthMain = styled.main`
  display: flex;
  margin: 0;
`;

const AuthTitle = styled.div`
  box-sizing: border-box;
  width: 70%;
  min-height: 100%;
  padding: 2rem 1rem;
  transform: rotate(-180deg);
  writing-mode: tb-rl;
  font-family: Jost, sans-serif;
  font-size: 10rem;
  color: ${(props) => props.theme.colors.textColorBrown};
  background-color: ${(props) => props.theme.colors.backgroundColorMedium};
`;

const FormField = styled.aside`
  width: 30%;
  min-height: 100%;
  padding: 2rem 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.backgroundColorDark};
`;

export { AuthMain, AuthTitle, FormField };
