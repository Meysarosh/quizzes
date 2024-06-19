import { Container, ErrorMessage, Input, Label } from './FormField.styles';
import { PropTypes } from 'prop-types';

export function FormField({ children, register, error, defaultValue, value, onChange }) {
  const name = children.split(' ').join('');
  const isPassword = children.split(' ')[0] === 'password' ? true : false;

  function setType() {
    if (isPassword) return 'password';
    if (name === 'email') return 'email';
    if (name === 'dateofbirth') return 'date';
    return 'text';
  }

  return (
    <Container>
      <Label htmlFor={name}>{children}</Label>
      {register ? (
        <Input
          id={name}
          {...register(name)}
          type={setType()}
          defaultValue={defaultValue ?? ''}
          aria-label={`${name}-input`}
          value={value}
          onChange={onChange}
        />
      ) : (
        <Input
          id={name}
          type={setType()}
          aria-label={`${name}-input`}
          value={value}
          onChange={onChange}
        />
      )}
      <ErrorMessage>{error}</ErrorMessage>
    </Container>
  );
}

FormField.propTypes = {
  children: PropTypes.string,
  register: PropTypes.func,
  error: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
