import { components } from 'react-select';
import { ArrowDownIcon } from './DropdownIndicator.styles';
import { TbTriangleInvertedFilled } from 'react-icons/tb';

export const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowDownIcon>
        <TbTriangleInvertedFilled />
      </ArrowDownIcon>
    </components.DropdownIndicator>
  );
};
