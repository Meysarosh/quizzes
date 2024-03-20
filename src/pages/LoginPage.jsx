import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function LoginPage() {
  const name = useSelector((state) => state.user.name);
  alert(name);
  // console.log(name);
  return (
    <>
      <h1>Login</h1>;<Link to="/registration">Not registered yet? Click to Sing Up!</Link>
    </>
  );
}
