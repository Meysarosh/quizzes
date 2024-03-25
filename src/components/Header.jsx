import { useNavigate } from 'react-router';
import { Avatar, Logo, StyledHeader } from '../styles';

export function Header() {
  const navigate = useNavigate();

  function handleClickAvatar() {
    navigate('/profile');
  }

  function handleClickLogo() {
    navigate('/home');
  }

  return (
    <StyledHeader>
      <Logo onClick={handleClickLogo} />
      <Avatar $img="src/assets/img/default.png" onClick={handleClickAvatar} />
    </StyledHeader>
  );
}
