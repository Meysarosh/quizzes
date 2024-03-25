import { Link } from 'react-router-dom';

export function ProfilePage() {
  return (
    <>
      <h1>Profile Page</h1>
      <Link to="/home">Home</Link>
      <Link to="/quiz">Quiz</Link>
    </>
  );
}
