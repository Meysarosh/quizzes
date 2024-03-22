import { ErrorMessage, Input, Label } from '../styles';
import { PropTypes } from 'prop-types';

export function InputBlock({ children, register, error }) {
  const name = children.split(' ').join('');
  const isPassword = children.split(' ')[0] === 'password' ? true : false;

  return (
    <div>
      <Label htmlFor={name}>{children}</Label>
      {register ? (
        <Input id={name} {...register(name)} type={isPassword ? 'password' : 'text'} />
      ) : (
        <Input id={name} type={isPassword ? 'password' : 'text'} />
      )}
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
}

InputBlock.propTypes = {
  children: PropTypes.string,
  register: PropTypes.func,
  error: PropTypes.string,
};
