import { RegistrationForm } from './components/RegistrationForm';
import { AuthMain, AuthInfo, FormField } from './RegistrationPage.styles';

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
