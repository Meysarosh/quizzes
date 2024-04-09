import styled from 'styled-components';

const Main = styled.main`
  box-sizing: border-box;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  display: flex;
`;

const Section = styled.section`
  padding: 6.125rem 5.5rem 0 5.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-family: Jost, sans-serif;
  font-size: 5rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.rawUmber};
`;

const Heading = styled.h2`
  margin: 0;
  font-family: Jost, sans-serif;
  font-size: 3.125rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.rawUmber};
`;

const Aside = styled.aside`
  width: 35%;
  height: 100vh;
  padding: 5rem 5rem 2.25rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.colors.linen};
`;

export { Main, PageTitle, Heading, Aside, Section };
