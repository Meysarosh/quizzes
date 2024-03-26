import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.125rem;
`;

const Title = styled.p`
  font-family: InterReg, sans-serif;
  font-size: 3rem;
  color: ${(props) => props.theme.colors.rawUmber};
`;

const Button = styled.button`
  height: 2.5rem;
  width: 2.5rem;
  border: none;
  background-color: ${(props) => props.theme.colors.caramel};
  background-image: url('src/assets/img/x.svg');
  background-size: 1.45rem 1.45rem;
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    cursor: pointer;
  }
`;

export { Title, Header, Button };
