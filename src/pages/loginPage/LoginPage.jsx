import { Link } from 'react-router-dom';
import { AuthMain, AuthTitle, FormContainer } from './LoginPage.styles';
import { LoginForm } from './components/LoginForm';

export function LoginPage() {
  return (
    <AuthMain>
      <AuthTitle>Login</AuthTitle>
      <FormContainer>
        <LoginForm />
        <Link to="/registration">Not registered yet? Click to Sing Up!</Link>
      </FormContainer>
    </AuthMain>
  );
}
