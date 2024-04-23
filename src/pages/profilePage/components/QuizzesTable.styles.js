import styled from 'styled-components';

const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 2rem;
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
  table-layout: fixed;
  border: 2px solid ${(props) => props.theme.colors.caramel};
  border-collapse: collapse;
`;

const Th = styled.th`
  font-size: 1.25rem;
  font-weight: 400;
  border: 1px solid ${(props) => props.theme.colors.caramel};
`;

const Td = styled.td`
  height: 2rem;
  text-align: center;
  font-size: 1.25rem;
  border: 1px solid ${(props) => props.theme.colors.caramel};
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
    color: ${(props) => props.theme.colors.linen};
    background-color: ${(props) => props.theme.colors.caramelSuccess};
  }

  &:active {
    color: ${(props) => props.theme.colors.linen};
    background-color: ${(props) => props.theme.colors.caramelDanger};
  }
`;

export { TableContainer, Table, Th, Td, Button };
