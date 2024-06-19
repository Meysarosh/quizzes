import styled from 'styled-components';

const Main = styled.main`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  padding: 6.125rem 5.875rem 6.125rem 5.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 5rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.caputMortuum};
`;

const Paragraph = styled.p`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.caputMortuum};
`;

export { Main, Heading, Paragraph };
