import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '../../../store/actions';
import { Button, Form } from './LoginForm.styles';
import { InputBlock } from '../../../components/inputBlock';
import { notify } from '../../../components/toast/notify';

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
      <InputBlock>email</InputBlock>
      <InputBlock>password</InputBlock>
      <Button type="submit">Login</Button>
    </Form>
  );
}
