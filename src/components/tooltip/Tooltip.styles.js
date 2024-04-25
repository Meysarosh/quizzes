import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: absolute;
  bottom: calc(100% + 1rem);
  left: 0;
  min-width: 15rem;
  min-height: 5rem;
  padding: 0.5rem;

  color: ${(props) => props.theme.colors.caputMortuum};
  background-color: ${(props) => props.theme.colors.linen};
  border: 0.3rem solid ${(props) => props.theme.colors.desertSand};
  border-radius: 0.3rem;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 30%;
    border-width: 1rem;
    border-style: solid;
    border-color: ${(props) => props.theme.colors.desertSand} transparent transparent transparent;
  }
`;

export { TooltipContainer };
