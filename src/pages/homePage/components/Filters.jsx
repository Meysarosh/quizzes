import { PropTypes } from 'prop-types';
import {
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
} from './Filters.styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  setQuizBankFilter,
  setDifficultyFilterAll,
  setDifficultyFilter,
  filterByDifficulty,
  filterByQuizBank,
  setQuantityFilter,
} from '../../../store/slices/questionsSlice';
import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { DropdownIndicator } from './DropdownIndicator';
import { selectStyles } from '../../../utils/const/selectStyles';
import { MdClose } from 'react-icons/md';

const quantityOptions = [
  { value: '', label: 'All' },
  { value: 5, label: '5' },
  { value: 10, label: '10' },
];

export function Filters({ onClick }) {
  const dispatch = useDispatch();
  const difficultiesContainerRef = useRef(null);

  const { filters, quizBanks, difficulties, questions, filteredQuestions } = useSelector(
    (state) => state.questions
  );

  const [quizBankOptions, setQuizBankOptions] = useState([]);
  const [difficultiesForFilter, setDifficultiesForFilter] = useState([]);
  const [difficultyMenuIsDisabled, setDifficultyMenuIsDisabled] = useState(true);
  const [difficultyMenuIsOpen, setDifficultyMenuIsOpen] = useState(false);
  const [all, setAll] = useState(true);
  const [questionsCount, setQuestionsCount] = useState(questions.length);

  useEffect(() => {
    dispatch(setQuizBankFilter(''));
    dispatch(filterByQuizBank());
  }, [dispatch]);

  useEffect(() => {
    setQuizBankOptions(
      quizBanks.reduce(
        (acc, cur) => {
          acc.push({ value: cur, label: cur });
          return acc;
        },
        [{ value: '', label: 'Select' }]
      )
    );
  }, [quizBanks]);

  useEffect(() => {
    setDifficultiesForFilter(
      filters.quizBank === 'React' ? difficulties.React : difficulties.Other
    );
  }, [filters.quizBank, difficulties]);

  useEffect(() => {
    setDifficultyMenuIsDisabled(!filters.quizBank);
  }, [filters.quizBank]);

  useEffect(() => {
    function handleClickOutsideMenu(e) {
      difficultiesContainerRef.current &&
        !difficultiesContainerRef.current.contains(e.target) &&
        difficultyMenuIsOpen &&
        setDifficultyMenuIsOpen((prev) => !prev);
    }
    document.addEventListener('mousedown', handleClickOutsideMenu);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    };
  }, [difficultiesContainerRef, difficultyMenuIsOpen]);

  useEffect(() => {
    setAll(filters.difficulty.length === difficultiesForFilter.length);
  }, [filters.difficulty, difficultiesForFilter.length]);

  useEffect(() => {
    dispatch(setDifficultyFilterAll(difficultiesForFilter));
    setAll(true);
  }, [filters.quizBank, difficultiesForFilter, dispatch]);

  useEffect(() => {
    setQuestionsCount(filteredQuestions.length);
  }, [filteredQuestions]);

  function handleBankChange(e) {
    dispatch(setQuizBankFilter(e.value));
    dispatch(filterByQuizBank());
  }

  function handleDifficultyMenu() {
    !difficultyMenuIsDisabled && setDifficultyMenuIsOpen((prev) => !prev);
  }

  function handleCheckboxAllChange() {
    const arr = all ? [] : difficultiesForFilter;
    dispatch(setDifficultyFilterAll(arr));
    setAll(!all);
    dispatch(filterByDifficulty());
  }

  function handleCheckboxChange(e) {
    dispatch(setDifficultyFilter(e.target.name));
    dispatch(filterByDifficulty());
  }

  function handleQuantityChange(e) {
    dispatch(setQuantityFilter(e.value));
  }

  function isChecked(name) {
    return !!filters.difficulty.find((el) => el === name);
  }

  return (
    <>
      <Header>
        <Title>Filters</Title>
        <ButtonClose onClick={onClick}>
          <MdClose />
        </ButtonClose>
      </Header>
      <Container>
        <Label htmlFor="quizBank">Quiz bank</Label>
        <Select
          inputId="quizBank"
          onChange={handleBankChange}
          options={quizBankOptions}
          defaultValue={quizBankOptions[0]}
          styles={selectStyles}
          components={{ DropdownIndicator }}
          hideSelectedOptions={true}
        />
      </Container>
      <DifficultyContainer ref={difficultiesContainerRef} onClick={handleDifficultyMenu}>
        <Paragraph $isDisabled={difficultyMenuIsDisabled}>Difficulty</Paragraph>
        <DifficultyControll>
          <SelectedList $isDisabled={difficultyMenuIsDisabled}>
            {(all && 'All') || filters.difficulty.map((el) => <li key={el}>{el}</li>)}
          </SelectedList>
          <ArrowContainer $menuIsOpen={difficultyMenuIsOpen} />
        </DifficultyControll>
        <Menu $menuIsOpen={difficultyMenuIsOpen}>
          <CheckboxContainer htmlFor="all">
            All
            <CheckboxInput
              type="checkbox"
              id="all"
              name="all"
              checked={all}
              onChange={handleCheckboxAllChange}
              disabled={difficultyMenuIsDisabled}
            />
            <CustomCheckbox checked={all} />
          </CheckboxContainer>
          {difficultiesForFilter.map((difficulty) => (
            <CheckboxContainer htmlFor={difficulty} key={difficulty}>
              {difficulty}
              <CheckboxInput
                type="checkbox"
                id={difficulty}
                name={difficulty}
                checked={isChecked(difficulty)}
                onChange={handleCheckboxChange}
                disabled={difficultyMenuIsDisabled}
              />
              <CustomCheckbox checked={isChecked(difficulty)} />
            </CheckboxContainer>
          ))}
        </Menu>
      </DifficultyContainer>
      <Container>
        <Label htmlFor="quantity">Questions quantity:</Label>
        <Select
          inputId="quantity"
          onChange={handleQuantityChange}
          options={quantityOptions}
          defaultValue={quantityOptions[0]}
          styles={selectStyles}
          components={{ DropdownIndicator }}
        />
      </Container>
      <Paragraph>Available questions: {questionsCount}</Paragraph>
    </>
  );
}

Filters.propTypes = {
  onClick: PropTypes.func,
};
