import { useState } from 'react';
import { TooltipContainer, Wrapper } from './Tooltip.styles';
import { PropTypes } from 'prop-types';

export function Tooltip({ children, text, direction, position }) {
  const [isVisible, setIsVisible] = useState(false);

  function handleMouseEnter() {
    setIsVisible(true);
  }

  function handleMouseLeave() {
    setIsVisible(false);
  }

  return (
    <Wrapper direction={direction} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      <div>
        <TooltipContainer
          $position={position}
          className={isVisible ? `tooltip-${position}` : 'hidden'}
        >
          <p>{text}</p>
        </TooltipContainer>
      </div>
    </Wrapper>
  );
}

Tooltip.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  text: PropTypes.string,
  direction: PropTypes.string,
  position: PropTypes.string,
};
