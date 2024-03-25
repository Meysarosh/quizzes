import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <Link to="/profile">Profile</Link>
      <Link to="/quiz">Quiz</Link>
    </>
  );
}
