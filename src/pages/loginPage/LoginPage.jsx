import { Link } from 'react-router-dom';
import { AuthMain, AuthTitle, FormField } from './LoginPage.styles';
import { LoginForm } from './components/LoginForm';

export function LoginPage() {
  return (
    <AuthMain>
      <AuthTitle>Login</AuthTitle>
      <FormField>
        <LoginForm />
        <Link to="/registration">Not registered yet? Click to Sing Up!</Link>
      </FormField>
    </AuthMain>
  );
}
