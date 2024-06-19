import styled from 'styled-components';

const HeaderContainer = styled.header`
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

const Switch = styled.div`
  position: relative;
  width: 6rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 1.35rem;
  color: ${(props) => props.theme.colors.caputMortuum};
  background-color: ${(props) => props.theme.colors.linen};
  border: 0.15rem solid ${(props) => props.theme.colors.rawUmber};
  border-radius: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

const SwitchBtn = styled.div`
  position: absolute;
  top: -0.2;
  margin-right: ${(props) => (props.$nightMode ? '2.8rem' : '-2.8rem')};
  height: 1.9rem;
  width: 3rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.rawUmber};
  transition: all 1s;
`;

const SwitchText = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

const LogoutBtn = styled.button`
  padding: 0;
  padding-top: 0.45rem;
  font-size: 1.75rem;
  line-height: 1.75rem;
  color: ${(props) => props.theme.colors.rawUmber};
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }
`;

export {
  HeaderContainer,
  LogoContainer,
  Avatar,
  Img,
  Switch,
  SwitchBtn,
  SwitchText,
  LogoutBtn,
  ProfileContainer,
};
