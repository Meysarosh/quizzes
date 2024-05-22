import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import Select from 'react-select';
import { MdClose } from 'react-icons/md';
import { TbTriangleInvertedFilled } from 'react-icons/tb';
import {
  SidebarContent,
  Title,
  Header,
  ButtonClose,
  Container,
  Label,
  Paragraph,
  FilterContainer,
  FilterControll,
  SelectedList,
  ArrowContainer,
  Menu,
  CheckboxContainer,
  CheckboxInput,
  CustomCheckbox,
  CustomCheckboxChecked,
} from './Filters.styles';
import { selectStyles } from '../../../../styles';
import { DropdownIndicator } from '../dropdownIndicator/DropdownIndicator';
import {
  setQuizBankFilter,
  setQuizTopicFilter,
  setDifficultyFilter,
  setQuantityFilter,
  setIsCorrectlyAnswered,
  setIsIncorrectlyAnswered,
  setIsUnanswered,
} from '../../../../store/slices/filtersSlice';
import { getAvailableQuestions } from '../../../../store/actions';

export function Filters({ onClick }) {
  const dispatch = useDispatch();

  const difficultiesContainerRef = useRef(null);
  const userAnswersFilterRef = useRef(null);
  const topicsRef = useRef(null);

  const { darkMode } = useSelector((state) => state.user);
  const {
    selectedFilters,
    quizTopics,
    quizBanks,
    difficulties,
    availableQuestionsQuantity,
    isAvailableQuestionsByAnswer,
  } = useSelector((state) => state.filters);

  const [optionsForQuizBank, setOptionsForQuizBank] = useState([]);
  const [optionsForQuizTopic, setOptionsForQuizTopic] = useState([]);
  const [optionsForDifficulties, setOptionsForDifficulties] = useState([]);
  const [isOpenDifficultyFilter, setIsOpenDifficultyFilter] = useState(false);
  const [isOpenUserAnswersFilter, setIsOpenUserAnswersFilter] = useState(false);
  const [isAllDifficulties, setIsAllDifficulties] = useState(true);

  const optionsForUserAnswers = ['unanswered', 'answered', 'correct', 'incorrect'];
  const quantityOptions = [
    { value: '', label: 'All' },
    { value: 5, label: '5' },
    { value: 10, label: '10' },
  ];

  useEffect(() => {
    setOptionsForQuizBank(
      quizBanks.reduce((acc, cur) => {
        acc.push({ value: cur, label: cur });
        return acc;
      }, [])
    );
  }, [quizBanks]);

  useEffect(() => {
    topicsRef.current.clearValue();
    setOptionsForQuizTopic(
      quizTopics
        .filter(({ title }) => title === selectedFilters.quizBank)
        .map(({ topic }) => ({ value: topic, label: topic }))
    );
  }, [quizTopics, selectedFilters.quizBank]);

  useEffect(() => {
    selectedFilters.quizBank &&
      setOptionsForDifficulties(
        selectedFilters.quizBank === 'React' ? difficulties.React : difficulties.Other
      );
  }, [selectedFilters.quizBank, difficulties]);

  useEffect(() => {
    dispatch(setQuizBankFilter());
  }, [dispatch]);

  useEffect(() => {
    optionsForDifficulties.length > 0 && dispatch(setDifficultyFilter(optionsForDifficulties));
  }, [dispatch, selectedFilters.quizBank, optionsForDifficulties]);

  useEffect(() => {
    selectedFilters.quizBank &&
      selectedFilters.difficulty.length > 0 &&
      dispatch(
        getAvailableQuestions({
          quizBank: selectedFilters.quizBank,
          topic: selectedFilters.topic,
        })
      );
  }, [selectedFilters, dispatch]);

  useEffect(() => {
    setIsAllDifficulties(selectedFilters.difficulty.length === optionsForDifficulties.length);
  }, [selectedFilters.difficulty, optionsForDifficulties.length]);

  function handleClickOutsideFilters({ target }) {
    difficultiesContainerRef.current &&
      !difficultiesContainerRef.current.contains(target) &&
      isOpenDifficultyFilter &&
      setIsOpenDifficultyFilter((prev) => !prev);

    userAnswersFilterRef.current &&
      !userAnswersFilterRef.current.contains(target) &&
      isOpenUserAnswersFilter &&
      setIsOpenUserAnswersFilter((prev) => !prev);
  }

  function handleBankChange({ value }) {
    dispatch(setQuizBankFilter(value));
  }

  function handleTopicChange(e) {
    e && dispatch(setQuizTopicFilter(e.value));
  }

  function handleDifficultyFilter() {
    selectedFilters.quizBank && setIsOpenDifficultyFilter((prev) => !prev);
  }

  function handleDifficultyCheckboxAllChange() {
    dispatch(setDifficultyFilter(isAllDifficulties ? [] : optionsForDifficulties));
  }

  function handleDifficultyCheckboxChange({ target }) {
    const idx = selectedFilters.difficulty.findIndex((el) => el === target.name);
    const newDifficulties =
      idx === -1
        ? [...selectedFilters.difficulty, target.name]
        : [...selectedFilters.difficulty].filter((_, index) => index != idx);
    dispatch(setDifficultyFilter(newDifficulties));
  }

  function handleUserAnswersFilter() {
    selectedFilters.quizBank && setIsOpenUserAnswersFilter((prev) => !prev);
  }

  function handleCheckboxUserAnswers({ target }) {
    if (target.name === 'answered') {
      if (selectedFilters.isCorrectlyAnswered === selectedFilters.isIncorrectlyAnswered) {
        dispatch(setIsIncorrectlyAnswered());
        dispatch(setIsCorrectlyAnswered());
      } else {
        !selectedFilters.isCorrectlyAnswered
          ? dispatch(setIsCorrectlyAnswered())
          : dispatch(setIsIncorrectlyAnswered());
      }
    }
    target.name === 'unanswered' && dispatch(setIsUnanswered());
    target.name === 'incorrect' && dispatch(setIsIncorrectlyAnswered());
    target.name === 'correct' && dispatch(setIsCorrectlyAnswered());
  }

  function handleQuantityChange({ value }) {
    dispatch(setQuantityFilter(value));
  }

  function isCheckedDifficulty(name) {
    return !!selectedFilters.difficulty.find((el) => el === name);
  }

  function isCheckedUserAnswers(name) {
    const { isCorrectlyAnswered, isIncorrectlyAnswered, isUnanswered } = selectedFilters;
    const { unanswered, correct, incorrect } = isAvailableQuestionsByAnswer;
    if (name === 'unanswered') return isUnanswered && unanswered;
    if (name === 'correct') return isCorrectlyAnswered && correct;
    if (name === 'incorrect') return isIncorrectlyAnswered && incorrect;
    return isCorrectlyAnswered && isIncorrectlyAnswered && (correct || incorrect);
  }

  function isDisabledUserAnswer(name) {
    if (name === 'answered')
      return !isAvailableQuestionsByAnswer.correct && !isAvailableQuestionsByAnswer.incorrect;
    return !isAvailableQuestionsByAnswer[name];
  }

  const ListForExclude = () => {
    const { isCorrectlyAnswered, isIncorrectlyAnswered, isUnanswered } = selectedFilters;
    return (
      <>
        {isCorrectlyAnswered && isIncorrectlyAnswered && isUnanswered && <li>All</li>}
        {isCorrectlyAnswered && isIncorrectlyAnswered && !isUnanswered && <li>Answered</li>}
        {isCorrectlyAnswered && !isIncorrectlyAnswered && <li>Correct</li>}
        {!isCorrectlyAnswered && isIncorrectlyAnswered && <li>Incorrect</li>}
        {isUnanswered && !(isCorrectlyAnswered && isIncorrectlyAnswered) && <li>Unanswered</li>}
      </>
    );
  };

  const classIsDisabled = () => {
    return !selectedFilters.quizBank ? 'menu-disabled' : '';
  };

  const classForArrow = (isOpen) => {
    return !selectedFilters.quizBank ? 'menu-disabled' : isOpen ? 'rotate-icon' : '';
  };

  const classDifficultyCheckbox = (difficulty) => {
    if (difficulty === 'All') return isAllDifficulties ? 'checkbox-checked' : '';
    return isCheckedDifficulty(difficulty) ? 'checkbox-checked' : '';
  };

  const classDifficultyCheckboxChecked = (difficulty) => {
    if (difficulty === 'All') return isAllDifficulties ? '' : 'hidden';
    return isCheckedDifficulty(difficulty) ? '' : 'hidden';
  };

  const classUserAnswersCheckboxContainer = (name) => {
    if (name === 'answered')
      return !isAvailableQuestionsByAnswer.correct && !isAvailableQuestionsByAnswer.incorrect
        ? 'menu-disabled'
        : '';
    return !isAvailableQuestionsByAnswer[name] ? 'menu-disabled' : '';
  };

  return (
    <SidebarContent onMouseDown={handleClickOutsideFilters}>
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
          options={optionsForQuizBank}
          styles={darkMode ? selectStyles : selectStyles}
          components={{ DropdownIndicator }}
          hideSelectedOptions={true}
        />
      </Container>
      <Container>
        <Label htmlFor="topicBank" className={classIsDisabled()}>
          Topic bank
        </Label>
        <Select
          ref={topicsRef}
          inputId="topicBank"
          onChange={handleTopicChange}
          options={optionsForQuizTopic}
          styles={selectStyles}
          components={{ DropdownIndicator }}
          hideSelectedOptions={true}
          isDisabled={!selectedFilters.quizBank}
        />
      </Container>
      <FilterContainer ref={difficultiesContainerRef} onClick={handleDifficultyFilter}>
        <Paragraph className={classIsDisabled()}>Difficulty</Paragraph>
        <FilterControll data-testid="diff-ctrl">
          <SelectedList className={classIsDisabled()}>
            {(isAllDifficulties && 'All') ||
              selectedFilters.difficulty.map((el) => <li key={el}>{el}</li>)}
          </SelectedList>
          <ArrowContainer className={classForArrow(isOpenDifficultyFilter)}>
            <TbTriangleInvertedFilled />
          </ArrowContainer>
        </FilterControll>
        <Menu className={isOpenDifficultyFilter ? '' : 'hidden'}>
          {['All', ...optionsForDifficulties].map((difficulty) => (
            <CheckboxContainer htmlFor={difficulty} key={difficulty}>
              {difficulty}
              <CheckboxInput
                type="checkbox"
                id={difficulty}
                name={difficulty}
                checked={difficulty === 'All' ? isAllDifficulties : isCheckedDifficulty(difficulty)}
                onChange={
                  difficulty === 'All'
                    ? handleDifficultyCheckboxAllChange
                    : handleDifficultyCheckboxChange
                }
                disabled={!selectedFilters.quizBank}
              />
              <CustomCheckbox className={classDifficultyCheckbox(difficulty)}>
                <CustomCheckboxChecked className={classDifficultyCheckboxChecked(difficulty)} />
              </CustomCheckbox>
            </CheckboxContainer>
          ))}
        </Menu>
      </FilterContainer>
      <FilterContainer ref={userAnswersFilterRef}>
        <Paragraph className={classIsDisabled()}>User answers</Paragraph>
        <FilterControll onClick={handleUserAnswersFilter} data-testid="user_answer-ctrl">
          <SelectedList className={classIsDisabled()}>
            <ListForExclude />
          </SelectedList>
          <ArrowContainer className={classForArrow(isOpenUserAnswersFilter)}>
            <TbTriangleInvertedFilled />
          </ArrowContainer>
        </FilterControll>
        <Menu className={isOpenUserAnswersFilter ? '' : 'hidden'}>
          {optionsForUserAnswers.map((name) => (
            <CheckboxContainer
              style={{ marginLeft: name === 'answered' ? '0' : '' }}
              key={name}
              htmlFor={name}
              className={classUserAnswersCheckboxContainer(name)}
            >
              {name}
              <CheckboxInput
                type="checkbox"
                id={name}
                name={name}
                checked={isCheckedUserAnswers(name)}
                onChange={handleCheckboxUserAnswers}
                disabled={isDisabledUserAnswer(name)}
              />
              <CustomCheckbox className={isCheckedUserAnswers(name) ? 'checkbox-checked' : ''}>
                <CustomCheckboxChecked className={isCheckedUserAnswers(name) ? '' : 'hidden'} />
              </CustomCheckbox>
            </CheckboxContainer>
          ))}
        </Menu>
      </FilterContainer>
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
      {availableQuestionsQuantity != null && (
        <Paragraph>Available questions: {availableQuestionsQuantity}</Paragraph>
      )}
    </SidebarContent>
  );
}

Filters.propTypes = {
  onClick: PropTypes.func,
};
