import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  flex-direction: ${(props) => props.direction};
`;

const TooltipContainer = styled.div`
  position: absolute;
  z-index: 1;
  transform: translateX(50%);
  min-width: 15rem;
  min-height: 5rem;
  padding: 0.5rem;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.caputMortuum};
  background-color: ${(props) => props.theme.colors.linen};
  border: 0.3rem solid ${(props) => props.theme.colors.desertSand};
  border-radius: 0.3rem;

  &::after {
    content: '';
    position: absolute;
    border-width: 1rem;
    border-style: solid;
  }
`;

export { TooltipContainer, Wrapper };
