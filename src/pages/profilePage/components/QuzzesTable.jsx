import { Table, Th, Td } from './QuizzesTable.styles';

export function QuizzesTable() {
  const tableHead = ['Quiz', 'Progress', 'Enrolled on', 'Status', 'Actions'];

  return (
    <Table>
      <thead>
        <tr>
          {tableHead.map((el) => (
            <Th key={el}>{el}</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
        </tr>
      </tbody>
    </Table>
  );
}
