import { ErrorMessage, Input, Label } from '../styles';
import { PropTypes } from 'prop-types';

export function InputBlock({ children, register, error }) {
  const name = children.split(' ').join('');

  return (
    <div>
      <Label htmlFor={name}>{children}</Label>
      {register ? <Input id={name} {...register(name)} /> : <Input id={name} />}
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
}

InputBlock.propTypes = {
  children: PropTypes.string,
  register: PropTypes.func,
  error: PropTypes.string,
};
