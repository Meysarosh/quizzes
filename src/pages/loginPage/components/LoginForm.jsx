import { useDispatch } from 'react-redux';
import { login } from '../../../store/actions';
import { Button, Form } from './LoginForm.styles';
import { FormField } from '../../../components/formField';
import { notify } from '../../../utils/helperFunctions/notify';
import { useNavigate } from 'react-router';

export function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function clearInput(e) {
    e.target[1].value = '';
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = { email: e.target[0].value, password: e.target[1].value };
    dispatch(login(data)).then((res) => {
      if (res.type === 'login/rejected') {
        notify('error', res.payload);
        clearInput(e);
      } else {
        notify('success', `Logged in successfully!`);
        navigate('/home');
      }
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormField>email</FormField>
      <FormField>password</FormField>
      <Button type="submit">Login</Button>
    </Form>
  );
}
