import styled from 'styled-components';

const Table = styled.table`
  margin-top: 2rem;
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
  font-size: 1.25rem;
  border: 1px solid ${(props) => props.theme.colors.caramel};
`;

export { Table, Th, Td };
