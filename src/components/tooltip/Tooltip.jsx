import { TooltipContainer } from './Tooltip.styles';
import { PropTypes } from 'prop-types';

export function Tooltip({ children, className }) {
  return (
    <TooltipContainer className={className}>
      <p>{children}</p>
    </TooltipContainer>
  );
}

Tooltip.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
};
