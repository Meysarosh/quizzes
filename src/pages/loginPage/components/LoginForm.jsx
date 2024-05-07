import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/actions';
import { Button, Form } from './LoginForm.styles';
import { FormField } from '../../../components/formField';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

export function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.token);
  const { error } = useSelector((state) => state.user);

  const [emailValue, setEmailValue] = useState('');
  const [passValue, setPassValue] = useState('');

  useEffect(() => {
    token && navigate('/home');
  }, [token, navigate]);

  useEffect(() => {
    error && setPassValue('');
  }, [error]);

  function handleSubmit(e) {
    e.preventDefault();
    const data = { email: emailValue, password: passValue };
    dispatch(login(data));
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
