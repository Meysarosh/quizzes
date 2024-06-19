import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { setIsAuth0 } from '../../store/slices/userSlice';
import { Auth0Btn, AccountLogos } from './Auth0LoginBtn.styles';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';

export function Auth0LoginBtn() {
  const dispatch = useDispatch();
  const { loginWithPopup } = useAuth0();

  function handleClick() {
    dispatch(setIsAuth0());
    loginWithPopup();
  }
  return (
    <Auth0Btn onClick={handleClick}>
      Login with account
      <AccountLogos>
        <FaGoogle />
        <FaGithub />
        <FaFacebook />
      </AccountLogos>
    </Auth0Btn>
  );
}
