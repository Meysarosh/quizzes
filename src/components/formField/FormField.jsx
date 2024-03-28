import { ErrorMessage, Input, Label } from './FormField.styles';
import { PropTypes } from 'prop-types';

export function FormField({ children, register, error }) {
  const name = children.split(' ').join('');
  const isPassword = children.split(' ')[0] === 'password' ? true : false;

  function setType() {
    if (isPassword) return 'password';
    if (name === 'email') return 'email';
    return 'text';
  }

  return (
    <div>
      <Label htmlFor={name}>{children}</Label>
      {register ? (
        <Input id={name} {...register(name)} type={setType()} />
      ) : (
        <Input id={name} type={setType()} />
      )}
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
}

FormField.propTypes = {
  children: PropTypes.string,
  register: PropTypes.func,
  error: PropTypes.string,
};
