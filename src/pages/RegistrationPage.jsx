import { RegistrationForm } from '../components';
import { AuthMain, AuthTitle, FormField } from '../styles';

export function RegistrationPage() {
  return (
    <AuthMain>
      <AuthTitle>Registration</AuthTitle>
      <FormField>
        <RegistrationForm />
      </FormField>
    </AuthMain>
  );
}
