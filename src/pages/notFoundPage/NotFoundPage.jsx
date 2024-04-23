import { useEffect } from 'react';
import { Main, Heading, Paragraph } from './NotFoundPage.styles';
import { useNavigate } from 'react-router';

export function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => navigate('/home'), 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <Main>
      <Heading>Page Not Found</Heading>
      <Paragraph>Redirecting to home page...</Paragraph>
    </Main>
  );
}
