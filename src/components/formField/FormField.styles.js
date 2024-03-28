import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 2.75rem;
  padding: 0.5rem;
  margin: 0.5rem 0;
  font-family: InterReg, sans-serif;
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.caputMortuum};
  border: none;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.colors.inputFieldColor};
`;

const Label = styled.label`
  margin-bottom: 0.25rem;
  font-family: Inter, sans-serif;
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.rawUmber};
`;

const ErrorMessage = styled.p`
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-family: InterReg, sans-serif;
  font-size: 0.85rem;
  color: red;
`;

export { Input, Label, ErrorMessage };
