import styled from 'styled-components';

const ModalBack = styled.div`
  display: block;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5e302380;
`;

const ModalWindow = styled.div`
  min-width: 45%;
  min-height: 35%;
  padding: 4rem 3rem 2.25rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.cardBackgroundColor};
`;

const ModalTitle = styled.h2`
  font-family: InterBold, sans-serif;
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.caputMortum};
`;

const ModalText = styled.p`
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.caputMortum};
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export { ModalBack, ModalWindow, ModalTitle, ModalText, ButtonsContainer };
