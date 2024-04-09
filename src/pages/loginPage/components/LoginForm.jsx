import { useDispatch } from 'react-redux';
import { login, getQuestions } from '../../../store/actions';
import { Button, Form } from './LoginForm.styles';
import { FormField } from '../../../components/formField';
import { notify } from '../../../utils/helperFunctions/notify';
import { push, go } from 'redux-first-history';

export function LoginForm() {
  const dispatch = useDispatch();

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
        dispatch(getQuestions(res.payload.accessToken)).then(() => {
          dispatch(push('/home'));
          dispatch(go());
        });
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
