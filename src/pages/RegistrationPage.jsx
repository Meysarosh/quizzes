import { RegistrationForm } from '../components';
import { AuthMain, AuthInfo, FormField } from '../styles';

export function RegistrationPage() {
  return (
    <AuthMain>
      <AuthInfo>Registration</AuthInfo>
      <FormField>
        <RegistrationForm />
      </FormField>
    </AuthMain>
  );
}
