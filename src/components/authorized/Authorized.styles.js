import styled from 'styled-components';

const Body = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  height: 4.7rem;
  padding: 0 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: linear-gradient(#5e30237a, #d9d9d900);
`;

const Logo = styled.div`
  height: 2.375rem;
  width: 2.375rem;
  background-image: url('src/assets/img/logo.svg');
  background-size: cover;
`;

const Avatar = styled.div`
  height: 2.375rem;
  width: 2.375rem;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.colors.rawUmber};
  background-image: url(${(props) => props.$img});
  background-size: cover;

  &:hover {
    cursor: pointer;
  }
`;

export { Body, Header, Logo, Avatar };
