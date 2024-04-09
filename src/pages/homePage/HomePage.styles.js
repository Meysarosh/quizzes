import styled from 'styled-components';

const Main = styled.main`
  box-sizing: border-box;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  padding: 6.125rem 5.5rem 0 5.5rem;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 5rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.rawUmber};
`;

const FilterButton = styled.button`
  height: 3.125rem;
  width: 3.125rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${(props) => props.theme.colors.linen};
  background-color: ${(props) => props.theme.colors.caramel};
  border: none;
  border-radius: 0.3rem;
  &:hover {
    cursor: pointer;
  }
`;

const Content = styled.section`
  margin: 4.625rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2.5rem;
`;

const Aside = styled.aside`
  position: fixed;
  z-index: 2;
  top: 0;
  right: 0;
  width: 25%;
  height: 100%;
  padding: 1.7rem;
  display: flex;
  row-gap: 1.875rem;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.linen};
  transition: all 0.5s ease-in-out;
`;

const BackToTopButton = styled.button`
  visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};
  position: fixed;
  bottom: 4rem;
  right: 5.5rem;
  height: 3.125rem;
  width: 3.125rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.125rem;
  color: ${(props) => props.theme.colors.linen};
  border: none;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.caramel};
  outline: #ffffff66 solid 1rem;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;

export { Main, PageTitle, Content, Header, FilterButton, Aside, BackToTopButton };
