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
  CustomCheckboxChecked,
  ExcludeContainer,
  ExcludeControll,
} from './Filters.styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  setQuizBankFilter,
  filterByQuizBank,
  setDifficultyFilterAll,
  setDifficultyFilter,
  filterByDifficultyAll,
  setQuantityFilter,
  setIsCorrectlyAnswered,
  setIsIncorrectlyAnswered,
  setIsUnanswered,
  setQuizTopicFilter,
} from '../../../store/slices/filtersSlice';
import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { DropdownIndicator } from './DropdownIndicator';
import { selectStyles } from '../../../utils/const/selectStyles';
import { MdClose } from 'react-icons/md';
import { TbTriangleInvertedFilled } from 'react-icons/tb';
import { getAvailableQuestions } from '../../../store/actions';
import { useLocation } from 'react-router';

const quantityOptions = [
  { value: '', label: 'All' },
  { value: 5, label: '5' },
  { value: 10, label: '10' },
];

export function Filters({ onClick }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const difficultiesContainerRef = useRef(null);
  const excludeAnswersContainerRef = useRef(null);
  const topicsRef = useRef(null);

  const { token } = useSelector((state) => state.token);
  const { answeredQuestions } = useSelector((state) => state.user.user.quizzes);
  const { history } = useSelector((state) => state.user);
  const {
    selectedFilters,
    quizTopics,
    quizBanks,
    difficulties,
    availableQuestionsQuantity,
    isAvailableQuestionsByAnswer,
  } = useSelector((state) => state.filters);

  const [quizBankOptions, setQuizBankOptions] = useState([]);
  const [quizTopicOptions, setQuizTopicOptions] = useState([]);
  const [difficultiesForFilter, setDifficultiesForFilter] = useState([]);
  const [difficultyMenuIsOpen, setDifficultyMenuIsOpen] = useState(false);
  const [excludeMenuIsOpen, setExcludeMenuIsOpen] = useState(false);
  const [all, setAll] = useState(true);

  useEffect(() => {
    if (location.pathname === history.at(-1) && quizBanks.length > 0) {
      dispatch(setQuizBankFilter());
      dispatch(filterByQuizBank());
    }
  }, [dispatch, quizBanks, history, location.pathname]);

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
    topicsRef.current.clearValue();
    setQuizTopicOptions(
      quizTopics
        .filter(({ title }) => title === selectedFilters.quizBank)
        .map(({ topic }) => ({ value: topic, label: topic }))
    );
  }, [quizTopics, selectedFilters.quizBank]);

  useEffect(() => {
    difficultiesForFilter.length > 0 && dispatch(setDifficultyFilterAll(difficultiesForFilter));
    setAll(true);
  }, [dispatch, selectedFilters.quizBank, difficultiesForFilter]);

  useEffect(() => {
    selectedFilters.quizBank &&
      setDifficultiesForFilter(
        selectedFilters.quizBank === 'React' ? difficulties.React : difficulties.Other
      );
  }, [selectedFilters.quizBank, difficulties]);

  useEffect(() => {
    selectedFilters.quizBank &&
      selectedFilters.difficulty.length > 0 &&
      dispatch(getAvailableQuestions({ token, filters: selectedFilters, answeredQuestions }));
  }, [selectedFilters, dispatch, token, answeredQuestions]);

  useEffect(() => {
    setAll(selectedFilters.difficulty.length === difficultiesForFilter.length);
  }, [selectedFilters.difficulty, difficultiesForFilter.length]);

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
    function handleClickOutsideExMenu(e) {
      excludeAnswersContainerRef.current &&
        !excludeAnswersContainerRef.current.contains(e.target) &&
        excludeMenuIsOpen &&
        setExcludeMenuIsOpen((prev) => !prev);
    }
    document.addEventListener('mousedown', handleClickOutsideExMenu);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideExMenu);
    };
  }, [excludeAnswersContainerRef, excludeMenuIsOpen]);

  function handleBankChange(e) {
    dispatch(setQuizBankFilter(e.value));
    dispatch(filterByQuizBank());
  }

  function handleTopicChange(e) {
    e && dispatch(setQuizTopicFilter(e.value));
  }

  function handleDifficultyMenu() {
    selectedFilters.quizBank && setDifficultyMenuIsOpen((prev) => !prev);
  }

  function handleCheckboxAllChange() {
    dispatch(setDifficultyFilterAll(all ? [] : difficultiesForFilter));
    dispatch(filterByDifficultyAll(!all));
    setAll(!all);
  }

  function handleCheckboxChange(e) {
    dispatch(setDifficultyFilter(e.target.name));
  }

  function handleExcludeMenu() {
    selectedFilters.quizBank && setExcludeMenuIsOpen((prev) => !prev);
  }

  function handleCheckboxAnswered() {
    if (selectedFilters.isCorrectlyAnswered === selectedFilters.isIncorrectlyAnswered) {
      dispatch(setIsIncorrectlyAnswered());
      dispatch(setIsCorrectlyAnswered());
    } else {
      !selectedFilters.isCorrectlyAnswered
        ? dispatch(setIsCorrectlyAnswered())
        : dispatch(setIsIncorrectlyAnswered());
    }
  }

  function handleCheckboxIncorrectlyAnswered() {
    dispatch(setIsIncorrectlyAnswered());
  }

  function handleCheckboxCorrectlyAnswered() {
    dispatch(setIsCorrectlyAnswered());
  }

  function handleCheckboxUnanswered() {
    dispatch(setIsUnanswered());
  }

  function handleQuantityChange(e) {
    dispatch(setQuantityFilter(e.value));
  }

  function isChecked(name) {
    return !!selectedFilters.difficulty.find((el) => el === name);
  }

  const ListForExclude = () => {
    return (
      <>
        {selectedFilters.isCorrectlyAnswered &&
          selectedFilters.isIncorrectlyAnswered &&
          selectedFilters.isUnanswered && <li>All</li>}
        {selectedFilters.isCorrectlyAnswered &&
          selectedFilters.isIncorrectlyAnswered &&
          !selectedFilters.isUnanswered && <li>Answered</li>}
        {selectedFilters.isCorrectlyAnswered && !selectedFilters.isIncorrectlyAnswered && (
          <li>Correct</li>
        )}
        {!selectedFilters.isCorrectlyAnswered && selectedFilters.isIncorrectlyAnswered && (
          <li>Incorrect</li>
        )}
        {selectedFilters.isUnanswered &&
          !(selectedFilters.isCorrectlyAnswered && selectedFilters.isIncorrectlyAnswered) && (
            <li>Unanswered</li>
          )}
      </>
    );
  };

  const classDifficultyArrow = () => {
    return !selectedFilters.quizBank ? 'menu-disabled' : difficultyMenuIsOpen ? 'rotate-icon' : '';
  };

  const classExcludeArrow = () => {
    return !selectedFilters.quizBank ? 'menu-disabled' : excludeMenuIsOpen ? 'rotate-icon' : '';
  };

  const isDisabledUnunswered = () => {
    return !selectedFilters.quizBank || !isAvailableQuestionsByAnswer.unanswered;
  };

  const isCheckedUnanswered = () => {
    return selectedFilters.isUnanswered && isAvailableQuestionsByAnswer.unanswered;
  };

  const isDisabledAnswered = () => {
    return (
      !selectedFilters.quizBank ||
      (!isAvailableQuestionsByAnswer.correct && !isAvailableQuestionsByAnswer.incorrect)
    );
  };

  const isCheckedAnswered = () => {
    return (
      selectedFilters.isCorrectlyAnswered &&
      selectedFilters.isIncorrectlyAnswered &&
      (isAvailableQuestionsByAnswer.correct || isAvailableQuestionsByAnswer.incorrect)
    );
  };

  const isDisabledCorrect = () => {
    return !selectedFilters.quizBank || !isAvailableQuestionsByAnswer.correct;
  };

  const isCheckedCorrect = () => {
    return selectedFilters.isCorrectlyAnswered && isAvailableQuestionsByAnswer.correct;
  };

  const isDisabledIncorrect = () => {
    return !selectedFilters.quizBank || !isAvailableQuestionsByAnswer.incorrect;
  };

  const isCheckedIncorrect = () => {
    return selectedFilters.isIncorrectlyAnswered && isAvailableQuestionsByAnswer.incorrect;
  };

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
      <Container>
        <Label htmlFor="topicBank" className={!selectedFilters.quizBank ? 'menu-disabled' : ''}>
          Topic bank
        </Label>
        <Select
          ref={topicsRef}
          inputId="topicBank"
          onChange={handleTopicChange}
          options={quizTopicOptions}
          defaultValue={quizTopicOptions[0]}
          styles={selectStyles}
          components={{ DropdownIndicator }}
          hideSelectedOptions={true}
          isDisabled={!selectedFilters.quizBank}
        />
      </Container>
      <DifficultyContainer ref={difficultiesContainerRef} onClick={handleDifficultyMenu}>
        <Paragraph className={!selectedFilters.quizBank ? 'menu-disabled' : ''}>
          Difficulty
        </Paragraph>
        <DifficultyControll>
          <SelectedList className={!selectedFilters.quizBank ? 'menu-disabled' : ''}>
            {!selectedFilters.quizBank && !all && 'All'}
            {(all && 'All') || selectedFilters.difficulty.map((el) => <li key={el}>{el}</li>)}
          </SelectedList>
          <ArrowContainer className={classDifficultyArrow()}>
            <TbTriangleInvertedFilled />
          </ArrowContainer>
        </DifficultyControll>
        <Menu className={difficultyMenuIsOpen ? '' : 'hidden'}>
          <CheckboxContainer htmlFor="all">
            All
            <CheckboxInput
              type="checkbox"
              id="all"
              name="all"
              checked={all}
              onChange={handleCheckboxAllChange}
              disabled={!selectedFilters.quizBank}
            />
            <CustomCheckbox className={all ? 'checkbox-checked' : ''}>
              <CustomCheckboxChecked className={all ? '' : 'hidden'} />
            </CustomCheckbox>
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
                disabled={!selectedFilters.quizBank}
              />
              <CustomCheckbox className={isChecked(difficulty) ? 'checkbox-checked' : ''}>
                <CustomCheckboxChecked className={isChecked(difficulty) ? '' : 'hidden'} />
              </CustomCheckbox>
            </CheckboxContainer>
          ))}
        </Menu>
      </DifficultyContainer>
      <ExcludeContainer ref={excludeAnswersContainerRef}>
        <Paragraph className={!selectedFilters.quizBank ? 'menu-disabled' : ''}>
          User answers
        </Paragraph>
        <ExcludeControll onClick={handleExcludeMenu}>
          <SelectedList className={!selectedFilters.quizBank ? 'menu-disabled' : ''}>
            <ListForExclude />
          </SelectedList>
          <ArrowContainer className={classExcludeArrow()}>
            <TbTriangleInvertedFilled />
          </ArrowContainer>
        </ExcludeControll>
        <Menu className={excludeMenuIsOpen ? '' : 'hidden'}>
          <CheckboxContainer
            htmlFor="unanswered"
            className={isDisabledUnunswered() ? 'menu-disabled' : ''}
          >
            Unanswered
            <CheckboxInput
              type="checkbox"
              id="unanswered"
              name="unanswered"
              checked={isCheckedUnanswered()}
              onChange={handleCheckboxUnanswered}
              disabled={isDisabledUnunswered()}
            />
            <CustomCheckbox className={isCheckedUnanswered() ? 'checkbox-checked' : ''}>
              <CustomCheckboxChecked className={isCheckedUnanswered() ? '' : 'hidden'} />
            </CustomCheckbox>
          </CheckboxContainer>
          <CheckboxContainer
            style={{ marginLeft: '0' }}
            htmlFor="answered"
            className={isDisabledAnswered() ? 'menu-disabled' : ''}
          >
            Answered
            <CheckboxInput
              type="checkbox"
              id="answered"
              name="answered"
              checked={isCheckedAnswered()}
              onChange={handleCheckboxAnswered}
              disabled={isDisabledAnswered()}
            />
            <CustomCheckbox className={isCheckedAnswered() ? 'checkbox-checked' : ''}>
              <CustomCheckboxChecked className={isCheckedAnswered() ? '' : 'hidden'} />
            </CustomCheckbox>
          </CheckboxContainer>
          <CheckboxContainer
            htmlFor="correct"
            className={isDisabledCorrect() ? 'menu-disabled' : ''}
          >
            Correctly
            <CheckboxInput
              type="checkbox"
              id="correct"
              name="correct"
              checked={isCheckedCorrect()}
              onChange={handleCheckboxCorrectlyAnswered}
              disabled={isDisabledCorrect()}
            />
            <CustomCheckbox className={isCheckedCorrect() ? 'checkbox-checked' : ''}>
              <CustomCheckboxChecked className={isCheckedCorrect() ? '' : 'hidden'} />
            </CustomCheckbox>
          </CheckboxContainer>
          <CheckboxContainer
            htmlFor="incorrect"
            className={isDisabledIncorrect() ? 'menu-disabled' : ''}
          >
            Incorrectly
            <CheckboxInput
              type="checkbox"
              id="incorrect"
              name="incorrect"
              checked={isCheckedIncorrect()}
              onChange={handleCheckboxIncorrectlyAnswered}
              disabled={isDisabledIncorrect()}
            />
            <CustomCheckbox className={isCheckedIncorrect() ? 'checkbox-checked' : ''}>
              <CustomCheckboxChecked className={isCheckedIncorrect() ? '' : 'hidden'} />
            </CustomCheckbox>
          </CheckboxContainer>
        </Menu>
      </ExcludeContainer>
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
    </>
  );
}

Filters.propTypes = {
  onClick: PropTypes.func,
};
