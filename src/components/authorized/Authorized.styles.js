import styled from 'styled-components';

const Body = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  position: absolute;
  z-index: 1;
  top: 0;
  width: 100%;
  height: 4.7rem;
  padding: 0 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: linear-gradient(#5e30237a, #d9d9d900);
`;

const LogoContainer = styled.div`
  height: 2.375rem;
  width: 2.375rem;
`;

const Avatar = styled.div`
  height: 2.375rem;
  width: 2.375rem;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.colors.rawUmber};
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  height: 100%;
  margin-left: 50%;
  transform: translateX(-50%);
`;

export { Body, Header, LogoContainer, Avatar, Img };
