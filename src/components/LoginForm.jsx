import { ConfirmButton, Form } from '../styles';
import { InputBlock } from './InputBlock';

export function LoginForm() {
  function handleSubmit(e) {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    alert(username, password);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputBlock>email</InputBlock>
      <InputBlock>password</InputBlock>
      <ConfirmButton type="submit">Login</ConfirmButton>
    </Form>
  );
}
