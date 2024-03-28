import { PropTypes } from 'prop-types';
import { Title, Header, ButtonClose } from './Filters.styles';
import { FormField } from '../../../components/formField';

export function Filters({ onClick }) {
  return (
    <>
      <Header>
        <Title>Filters</Title>
        <ButtonClose onClick={onClick}></ButtonClose>
      </Header>
      <FormField>Name</FormField>
      <FormField>Difficulty</FormField>
      <FormField>Quiz bank</FormField>
      <FormField>Status</FormField>
    </>
  );
}

Filters.propTypes = {
  onClick: PropTypes.func,
};
