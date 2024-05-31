import styled from 'styled-components';

const Main = styled.main`
  flex-grow: 1;
  width: 100%;
  height: 100vh;
  padding: 3rem 5.875rem 3rem 5.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.colors.mainBackground};
`;

const Header = styled.header`
  width: 100%;
`;

const Heading = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 5rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.caputMortuum};
`;

const ActionsContainer = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const SuccessBar = styled.div`
  width: 100%;
  height: 1.5rem;
  margin: 0.5rem 0;
  display: flex;
  border-radius: 1rem;
  background-color: lightgrey;
  overflow: hidden;
`;

const GreenBar = styled.div`
  height: 100%;
  width: ${(props) => props.$width};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: green;
`;

const RedBar = styled.div`
  height: 100%;
  width: ${(props) => props.$width};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
`;

const GreyBar = styled.div`
  height: 100%;
  width: ${(props) => props.$width};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Span = styled.span`
  color: #fff;
`;

const Button = styled.button`
  height: 2.7rem;
  min-width: 8.5rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-family: InterReg, sans-serif;
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.linen};
  border: none;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.colors.caramel};

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.caramelSuccess};
  }
`;

const Icon = styled.div`
  display: inline;
  height: 2rem;
  width: 2rem;
  font-size: 2rem;

  &:hover {
    cursor: help;
  }
`;

const Section = styled.section`
  width: 100%;
  height: 100%;
  padding-right: 0.5rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.desertSand};
    border-radius: 0.5rem;
  }
`;

const QuestionContainer = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.caputMortuum};
`;

const QuestionTitle = styled.h3`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.caputMortuum};
`;

const Ul = styled.ul`
  width: fit-content;

  color: ${(props) => props.theme.colors.textColorBrown};
`;

const Li = styled.li`
  font-size: 1.75rem;
`;

export {
  Main,
  Header,
  Heading,
  ActionsContainer,
  SuccessBar,
  GreenBar,
  RedBar,
  GreyBar,
  Span,
  Button,
  Icon,
  Section,
  QuestionContainer,
  QuestionTitle,
  Ul,
  Li,
};
