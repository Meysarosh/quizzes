import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { filterByIds } from '../../utils/helperFunctions/filterById';

export const getAvailableQuestions = createAsyncThunk(
  'getAvailableQuestions',
  async function ({ token, filters, answeredQuestions }, { rejectWithValue }) {
    const {
      quizBank,
      topic,
      difficulty,
      isCorrectlyAnswered,
      isIncorrectlyAnswered,
      isUnanswered,
    } = filters;

    const difficultiesQuerryString = difficulty.map((el) => `&level=${el}`).join('');

    const response = await axios
      .get(
        `http://localhost:4000/${quizBank}?${topic ? `topic=${topic}` : ''}${difficultiesQuerryString ?? ''}`,
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

    const filteredData = filterByIds(
      response.data,
      answeredQuestions[quizBank],
      isCorrectlyAnswered,
      isIncorrectlyAnswered,
      isUnanswered
    );

    return isCorrectlyAnswered && isIncorrectlyAnswered && isUnanswered
      ? {
          data: response.data,
          isAvailableQuestionsByAnswer: checkAvailability(
            response.data,
            answeredQuestions[quizBank]
          ),
        }
      : {
          data: filteredData,
          isAvailableQuestionsByAnswer: checkAvailability(
            response.data,
            answeredQuestions[quizBank]
          ),
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
