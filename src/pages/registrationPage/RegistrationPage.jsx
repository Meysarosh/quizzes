import { RegistrationForm } from './components/RegistrationForm';
import { AuthMain, AuthTitle, FormContainer } from './RegistrationPage.styles';

export function RegistrationPage() {
  return (
    <AuthMain>
      <AuthTitle>Registration</AuthTitle>
      <FormContainer>
        <RegistrationForm />
      </FormContainer>
    </AuthMain>
  );
}
