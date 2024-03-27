import { RegistrationForm } from './components/RegistrationForm';
import { AuthMain, AuthTitle, FormField } from './RegistrationPage.styles';

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
