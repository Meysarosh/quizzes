import { Main, PageTitle, Heading, Aside, Section } from './ProfilePage.styles';
import { ProfileForm } from './components/ProfileForm';
import { QuizzesTable } from './components/QuzzesTable';

export function ProfilePage() {
  return (
    <Main>
      <Aside>
        <ProfileForm />
      </Aside>
      <Section>
        <PageTitle>Profile</PageTitle>
        <Heading>My Quizzes</Heading>
        <QuizzesTable />
      </Section>
    </Main>
  );
}
