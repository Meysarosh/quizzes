import { components } from 'react-select';
import { ArrowDownIcon } from './DropdownIndicator.styles';

export const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowDownIcon />
    </components.DropdownIndicator>
  );
};
