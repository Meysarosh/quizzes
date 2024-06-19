import styled from 'styled-components';

const Auth0Btn = styled.button`
  margin-bottom: 3rem;
  align-self: center;
  min-width: max-content;
  max-width: max-content;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
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

const AccountLogos = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export { Auth0Btn, AccountLogos };
