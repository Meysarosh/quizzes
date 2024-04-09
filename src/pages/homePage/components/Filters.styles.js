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

const ButtonClose = styled.button`
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

const Label = styled.label`
  font-family: InterReg, sans-serif;
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.rawUmber};
`;

const Paragraph = styled.p`
  font-family: InterReg, sans-serif;
  font-size: 1.25rem;
  color: ${(props) => (props.$isDisabled ? 'grey' : props.theme.colors.rawUmber)};
`;

const DifficultyContainer = styled.div`
  width: 100%;
  min-height: fit-content;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

const DifficultyControll = styled.div`
  width: 100%;
  min-height: 2.7rem;
  padding: 0.3rem 0.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.colors.cardBackgroundColor};
  cursor: pointer;
`;

const SelectedList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  font-family: InterReg, sans-serif;
  font-size: 1.25rem;
  color: ${(props) => (props.$isDisabled ? 'grey' : props.theme.colors.caputMortuum)};
  line-height: normal;
  list-style-type: none;

  & li {
    padding-right: 0.5rem;
  }
`;

const ArrowContainer = styled.div`
  height: 1rem;
  width: 1rem;
  background-image: url('src/assets/img/polygon.svg');
  background-size: 1rem 1rem;
  background-repeat: no-repeat;
  background-position: center;
  transform: ${(props) => (props.$menuIsOpen ? 'rotate(180deg)' : 'rotate(0)')};
`;

const Menu = styled.div`
  display: ${(props) => (props.$menuIsOpen ? 'block' : 'none')};
  width: 100%;
  min-height: fit-content;
  padding: 0.5rem 0.5rem 0 0.5rem;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.colors.cardBackgroundColor};
`;

const CheckboxContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 2rem;
  margin-bottom: 0.5rem;
  font-family: InterReg, sans-serif;
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.rawUmber};
  user-select: none;
  cursor: pointer;

  &:not(:first-child) {
    margin-left: 2rem;
  }
`;

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const CustomCheckbox = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 1.25rem;
  width: 1.25rem;
  background-color: ${(props) =>
    props.checked ? props.theme.colors.desertSand : props.theme.colors.linen};

  &:after {
    display: ${(props) => (props.checked ? 'block' : 'none')};
    content: '';
    position: absolute;
    top: 0.1rem;
    left: 0.35rem;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

export {
  Title,
  Header,
  ButtonClose,
  Container,
  Label,
  Paragraph,
  DifficultyContainer,
  DifficultyControll,
  SelectedList,
  ArrowContainer,
  Menu,
  CheckboxContainer,
  CheckboxInput,
  CustomCheckbox,
};
