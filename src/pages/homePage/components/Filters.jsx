import { PropTypes } from 'prop-types';
import { Title, Header, Button } from './Filters.styles';
import { InputBlock } from '../../../components/inputBlock';

export function Filters({ onClick }) {
  return (
    <>
      <Header>
        <Title>Filters</Title>
        <Button onClick={onClick}></Button>
      </Header>
      <InputBlock>Name</InputBlock>
      <InputBlock>Difficulty</InputBlock>
      <InputBlock>Quiz bank</InputBlock>
      <InputBlock>Status</InputBlock>
    </>
  );
}

Filters.propTypes = {
  onClick: PropTypes.func,
};
