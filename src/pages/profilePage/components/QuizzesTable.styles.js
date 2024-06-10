import styled from 'styled-components';

const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-right: 0.5rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.desertSand};
    border-radius: 0.5rem;
  }
`;

const Table = styled.table`
  width: 100%;
  /* table-layout: fixed; */
  color: ${(props) => props.theme.colors.text};
  border: 2px solid ${(props) => props.theme.colors.caramel};
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 0.3rem;
  font-size: 1.25rem;
  font-weight: 400;
  border: 1px solid ${(props) => props.theme.colors.caramel};
`;

const Td = styled.td`
  height: 2rem;
  padding: 0.3rem;
  text-align: center;
  font-size: 1.25rem;
  border: 1px solid ${(props) => props.theme.colors.caramel};
`;

const ButtonsContainer = styled.div`
  display: flex;
  column-gap: 0.5rem;
`;

const Button = styled.button`
  width: 6rem;
  height: 2.75rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: InterReg, sans-serif;
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.caramel};
  border: none;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.colors.linen};

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.linen};
    background-color: ${(props) => props.theme.colors.caramelSuccess};
  }

  &:active {
    color: ${(props) => props.theme.colors.linen};
    background-color: ${(props) => props.theme.colors.caramelDanger};
  }
`;

const BtnFilterVisibility = styled.button`
  margin-right: 2rem;
  width: 7rem;
  align-self: flex-end;
  font-size: 1rem;
  text-decoration: underline;
  color: ${(props) => props.theme.colors.caramel};
  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.caramelDanger};
  }
`;

const FiltersContainer = styled.div`
  margin: 1rem 0 1rem 0;
  width: 100%;
  display: flex;
  align-items: flex-end;
  column-gap: 1rem;
  transition: all 0.3s ease-out;
`;

const FilterElement = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelSC = styled.label`
  display: block;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.caramel};
`;

const InputSC = styled.input`
  margin: 0;
  height: 100%;
  padding: 0.4rem 0.25rem;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.caramel};
  border-radius: 0.25rem;
`;

const BtnSort = styled.button`
  margin-left: 0.5rem;
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.text};
  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

const BtnClear = styled.button`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.caramel};
  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.caramelDanger};
  }
`;

export {
  TableContainer,
  Table,
  Th,
  Td,
  ButtonsContainer,
  Button,
  LabelSC,
  InputSC,
  BtnFilterVisibility,
  BtnSort,
  FiltersContainer,
  FilterElement,
  BtnClear,
};
