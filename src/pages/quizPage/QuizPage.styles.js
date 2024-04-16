import styled from 'styled-components';

const Main = styled.main`
  box-sizing: border-box;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  padding: 6.125rem 5.875rem 6.125rem 5.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.h1`
  font-size: 5rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.caputMortuum};
`;

const ProcessStatus = styled.p`
  display: flex;
  align-items: center;
  font-size: 3rem;
  color: ${(props) => props.theme.colors.caputMortuum};
`;

const QuestionText = styled.p`
  padding: 4rem 3rem 0 3rem;
  font-size: 2.2rem;
`;

const Form = styled.form`
  padding-top: 2rem;
  max-width: 60%;
  display: flex;
  flex-direction: column;
  row-gap: 1.8rem;
`;

const RadioContainer = styled.label`
  position: relative;
  padding-left: 3rem;
  font-family: InterReg, sans-serif;
  font-size: 1.25rem;
`;

const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const CustomRadio = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  border: 0.3rem solid ${(props) => props.theme.colors.caramel};
`;

const Checked = styled.div`
  display: 'block';
  position: absolute;
  height: 1.5rem;
  width: 1.5rem;
  margin-top: 50%;
  margin-left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.caramel};
`;

const Nav = styled.nav`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ForvardButtons = styled.div`
  display: flex;
  column-gap: 1.5rem;
`;

const Button = styled.button`
  height: 2.7rem;
  width: 8.5rem;
  font-family: InterReg, sans-serif;
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.linen};
  border: none;
  border-radius: 0.3rem;
  background-color: ${(props) =>
    props.$warning ? props.theme.colors.caramelSuccess : props.theme.colors.caramel};

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.$warning ? props.theme.colors.caramelDanger : props.theme.colors.caramelSuccess};
  }
`;

const ArrowButton = styled.button`
  height: 3rem;
  width: 3rem;
  padding: 0;
  font-size: 3rem;
  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export {
  Main,
  Header,
  Heading,
  ProcessStatus,
  ArrowButton,
  QuestionText,
  Form,
  RadioContainer,
  RadioInput,
  CustomRadio,
  Checked,
  Nav,
  ForvardButtons,
  Button,
};
