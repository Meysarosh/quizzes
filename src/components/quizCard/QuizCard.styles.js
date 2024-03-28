import styled from 'styled-components';

const Card = styled.div`
  box-sizing: border-box;
  position: relative;
  max-height: 18.75rem;
  aspect-ratio: 1/1;

  padding: 1.25rem 0.75rem 0.75rem 0.75rem;
  border-radius: 0.65rem;
  background-color: ${(props) => props.theme.colors.cardBackgroundColor};
`;

const CardTitle = styled.p`
  margin: 0;
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.rawUmber};
`;

const CardTopic = styled.p`
  margin: 0;
  font-family: JostSemiBold, sans-serif;
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.caputMortuum};
`;

const Button = styled.button`
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  width: 5.625rem;
  height: 2.8rem;
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
    cursor: pointer;
  }

  &:active {
    background-color: ${(props) => props.theme.colors.caramelDanger};
  }
`;

export { Card, CardTitle, CardTopic, Button };
