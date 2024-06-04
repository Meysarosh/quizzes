import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/actions';
import { Button, Form } from './LoginForm.styles';
import { FormField } from '../../../components/formField';
import { useEffect, useState } from 'react';

export function LoginForm() {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.user);

  const [emailValue, setEmailValue] = useState('');
  const [passValue, setPassValue] = useState('');

  useEffect(() => {
    error && setPassValue('');
  }, [error]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login({ email: emailValue, password: passValue }));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormField value={emailValue} onChange={(e) => setEmailValue(e.target.value)}>
        email
      </FormField>
      <FormField value={passValue} onChange={(e) => setPassValue(e.target.value)}>
        password
      </FormField>
      <Button type="submit">Login</Button>
    </Form>
  );
}
