import styled from 'styled-components';

export const ConfirmButton = styled.button`
  width: 8.5rem;
  height: 2.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: InterReg, sans-serif;
  font-size: 1.25rem;
  color: var(--button-text-color);
  border: none;
  border-radius: 0.3rem;
  background-color: var(--button-color);

  &:hover {
    background-color: var(--button-color-hover);
  }

  &:active {
    background-color: var(--button-color-active);
  }
`;
