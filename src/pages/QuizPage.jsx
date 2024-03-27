import { Link } from 'react-router-dom';

export function QuizPage() {
  return (
    <>
      <h1>Quiz Page</h1>
      <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link>
    </>
  );
}
