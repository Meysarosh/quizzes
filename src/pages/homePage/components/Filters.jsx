import { PropTypes } from 'prop-types';
import { Title, Header, ButtonClose } from './Filters.styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  setQuizBankFilter,
  setDifficultyFilterAll,
  setDifficultyFilter,
  filterByDifficulty,
  filterByQuizBank,
  setQuantityFilter,
} from '../../../store/slices/questionsSlice';
import { useEffect, useState } from 'react';
export function Filters({ onClick }) {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.questions);
  const { quizBanks } = useSelector((state) => state.questions);
  const { difficulties } = useSelector((state) => state.questions);
  const { questions } = useSelector((state) => state.questions);
  const { filteredQuestions } = useSelector((state) => state.questions);

  const [all, setAll] = useState(true);
  const [difficultiesForFilter, setDifficultiesForFilter] = useState([]);
  const [questionsCount, setQuestionsCount] = useState(questions.length);

  useEffect(() => {
    setDifficultiesForFilter(
      filters.quizBank === 'React' ? difficulties.React : difficulties.Other
    );
  }, [filters.quizBank, difficulties]);

  useEffect(() => {
    if (filters.difficulty.length === difficultiesForFilter.length) setAll(true);
    else setAll(false);
  }, [filters.difficulty, difficultiesForFilter.length]);

  useEffect(() => {
    dispatch(setDifficultyFilterAll(difficultiesForFilter));
    setAll(true);
  }, [filters.quizBank, difficultiesForFilter, dispatch]);

  useEffect(() => {
    setQuestionsCount(filteredQuestions.length);
  }, [filteredQuestions]);

  function handleBankChange(e) {
    dispatch(setQuizBankFilter(e.target.value));
    dispatch(filterByQuizBank());
  }

  function handleCheckboxAllChange() {
    if (all) {
      dispatch(setDifficultyFilterAll([]));
      setAll(false);
    } else {
      dispatch(setDifficultyFilterAll(difficultiesForFilter));
      setAll(true);
    }
    dispatch(filterByDifficulty());
  }

  function handleCheckboxChange(e) {
    dispatch(setDifficultyFilter(e.target.name));
    dispatch(filterByDifficulty());
  }

  function handleQuantityChange(e) {
    dispatch(setQuantityFilter(e.target.value));
  }

  function isChecked(name) {
    const result = filters.difficulty.find((el) => el === name);
    if (result) return true;
    return false;
  }

  return (
    <>
      <Header>
        <Title>Filters</Title>
        <ButtonClose onClick={onClick}></ButtonClose>
      </Header>
      <div>
        <label htmlFor="bank">Quiz bank</label>
        <select name="bank" id="bank" onChange={handleBankChange}>
          <option value="">Select</option>
          {quizBanks.map((bank) => (
            <option key={bank} value={bank}>
              {bank}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Difficulty</label>
        <input
          type="checkbox"
          id="all"
          name="all"
          checked={all}
          onChange={handleCheckboxAllChange}
          disabled={filters.quizBank === null ? true : false}
        />
        <label htmlFor="all">All</label>
        {filters.quizBank != null &&
          difficultiesForFilter.map((difficulty) => (
            <div key={difficulty}>
              <input
                type="checkbox"
                id={difficulty}
                name={difficulty}
                checked={isChecked(difficulty)}
                onChange={handleCheckboxChange}
                disabled={filters.quizBank === null ? true : false}
              />
              <label htmlFor={difficulty}>{difficulty}</label>
            </div>
          ))}
      </div>

      <p>Available questions: {questionsCount}</p>
      <div>
        <label htmlFor="quantity">Questions quantity:</label>
        <select name="quantity" id="quantity" onChange={handleQuantityChange}>
          <option value="">All</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
    </>
  );
}

Filters.propTypes = {
  onClick: PropTypes.func,
};
