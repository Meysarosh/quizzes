import { useDispatch } from 'react-redux';
import { ConfirmButton, Form } from '../styles';
import { InputBlock } from './InputBlock';
import { login } from '../store/actions';
import { useNavigate } from 'react-router';
import { notify } from './notify';

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
      <ConfirmButton type="submit">Login</ConfirmButton>
    </Form>
  );
}
