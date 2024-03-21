import { Link } from 'react-router-dom';
import { AuthMain, AuthInfo, FormField } from '../styles';
import { LoginForm } from '../components';

export function LoginPage() {
  return (
    <AuthMain>
      <AuthInfo>Login</AuthInfo>
      <FormField>
        <LoginForm />
        <Link to="/registration">Not registered yet? Click to Sing Up!</Link>
      </FormField>
    </AuthMain>
  );
}
