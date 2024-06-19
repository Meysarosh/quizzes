import styled from 'styled-components';

const Form = styled.form`
  margin: auto 0;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Button = styled.button`
  width: 8.5rem;
  height: 2.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: InterReg, sans-serif;
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.linen};
  border: none;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.colors.caramel};

  &:hover {
    background-color: ${(props) => props.theme.colors.caramelSuccess};
  }

  &:active {
    background-color: ${(props) => props.theme.colors.caramelDanger};
  }
`;

export { Form, Button };
