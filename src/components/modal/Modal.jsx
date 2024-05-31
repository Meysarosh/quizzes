import { ModalBack, ModalWindow, ModalTitle, ModalText, ButtonsContainer } from './Modal.styles';
import { PropTypes } from 'prop-types';

export function Modal({ isModal, title, text, children }) {
  return (
    <ModalBack className={isModal ? '' : 'hidden'} data-testid="modal">
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
  text: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  children: PropTypes.arrayOf(PropTypes.element),
};
