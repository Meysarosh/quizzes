import styled from 'styled-components';

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  align-self: end;
  width: 8.5rem;
  height: 2.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: InterReg, sans-serif;
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.linen};
  border: none;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.colors.caramel};

  &:hover {
    background-color: ${(props) => props.theme.colors.caramelSuccess};
  }

  &:active {
    background-color: ${(props) => props.theme.colors.caramelDanger};
  }
`;

const Avatar = styled.div`
  position: relative;
  height: 10rem;
  width: 10rem;
  flex-shrink: 0;
  flex-basis: 10rem;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.colors.rawUmber};
`;

const ImgContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 50%;
`;

const Img = styled.img`
  height: 100%;
  margin-left: 50%;
  transform: translateX(-50%);
`;

const UserName = styled.p`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.rawUmber};
`;

const PlusButton = styled.button`
  position: absolute;
  z-index: 2;
  top: 7.75rem;
  left: 7.75rem;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.desertSand};
  border: none;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.caputMortuum};

  &:hover {
    cursor: pointer;
  }
`;

export { Form, Button, Avatar, ImgContainer, Img, UserName, PlusButton };
