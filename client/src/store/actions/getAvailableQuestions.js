import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { filterByIds } from '../../utils/helperFunctions/filterById';

export const getAvailableQuestions = createAsyncThunk(
  'getAvailableQuestions',
  async function ({ quizBank, topic }, { getState, rejectWithValue }) {
    const { token } = getState().token;
    const { answeredQuestions } = getState().user.user;
    const { difficulty, isCorrectlyAnswered, isIncorrectlyAnswered, isUnanswered, multiAnswer } =
      getState().filters.selectedFilters;
    const difficultiesQuerryString = difficulty.map((el) => `&level=${el}`).join('');
    const multi =
      multiAnswer !== 'all'
        ? multiAnswer === 'multi'
          ? `&isMulti=true`
          : `&correct_answer=1&correct_answer=2&correct_answer=3`
        : '';

    const response = await axios
      .get(
        `${import.meta.env.VITE_URL_QUESTIONS}/${quizBank}?${topic ? `topic=${topic}` : ''}${difficultiesQuerryString ?? ''}${multi ?? ''}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch(function (error) {
        if (error.response) throw rejectWithValue(error.response.data);
        else throw rejectWithValue(error.message);
      });

    return {
      data:
        isCorrectlyAnswered && isIncorrectlyAnswered && isUnanswered
          ? response.data
          : filterByIds(
              response.data,
              answeredQuestions[quizBank],
              isCorrectlyAnswered,
              isIncorrectlyAnswered,
              isUnanswered
            ),
      isAvailableQuestionsByAnswer: checkAvailability(response.data, answeredQuestions[quizBank]),
    };
  }
);

function checkAvailability(questions, answeredQuestions) {
  const isUnansweredExist =
    questions.reduce((acc, curr) => {
      !answeredQuestions?.find(({ id }) => curr.id === id) && acc.push(curr);
      return acc;
    }, []).length > 0;

  const isCorrectExist =
    questions.reduce((acc, curr) => {
      answeredQuestions?.find(
        ({ id, answer }) => id === curr.id && answer === curr.correct_answer
      ) && acc.push(curr);
      return acc;
    }, []).length > 0;

  const isIncorrectExist =
    questions.reduce((acc, curr) => {
      answeredQuestions?.find(
        ({ id, answer }) => id === curr.id && answer != curr.correct_answer
      ) && acc.push(curr);
      return acc;
    }, []).length > 0;

  return { unanswered: isUnansweredExist, correct: isCorrectExist, incorrect: isIncorrectExist };
}
