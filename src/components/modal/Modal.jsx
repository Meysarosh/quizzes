import { ModalBack, ModalWindow, ModalTitle, ModalText, ButtonsContainer } from './Modal.styles';
import { PropTypes } from 'prop-types';

export function Modal({ isModal, title, text, children }) {
  return (
    <ModalBack className={isModal ? '' : 'hidden'}>
      <ModalWindow>
        <ModalTitle>{title}</ModalTitle>
        <ModalText>{text}</ModalText>
        <ButtonsContainer>{children}</ButtonsContainer>
      </ModalWindow>
    </ModalBack>
  );
}

Modal.propTypes = {
  isModal: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.object,
  children: PropTypes.arrayOf(PropTypes.element),
};
