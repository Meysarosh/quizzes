import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { filterByIds } from '../../utils/helperFunctions/filterById';

export const getQuestion = createAsyncThunk(
  'getQuestion',
  async function (_, { getState, rejectWithValue }) {
    const { token } = getState().token;
    const { answeredQuestions } = getState().user.user;
    const { filters, questions } = getState().quiz.quiz;
    const {
      quizBank,
      topic,
      difficulty,
      isCorrectlyAnswered,
      isIncorrectlyAnswered,
      isUnanswered,
      multiAnswer,
    } = filters;

    const difficultiesQueryString = difficulty.map((el) => `&level=${el}`).join('');
    const prevQuestionsFilterQueryString = questions.map((id) => `&id_ne=${id}`).join('');
    const multi =
      multiAnswer !== 'all'
        ? multiAnswer === 'multi'
          ? `&isMulti=true`
          : `&correct_answer=1&correct_answer=2&correct_answer=3`
        : '';

    const response = await axios
      .get(
        `http://localhost:4000/${quizBank}?topic=${topic}${difficultiesQueryString ?? ''}${multi}${prevQuestionsFilterQueryString ?? ''}`,
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

    return isCorrectlyAnswered && isIncorrectlyAnswered && isUnanswered
      ? response.data[0]
      : filterByIds(
          response.data,
          answeredQuestions[quizBank],
          isCorrectlyAnswered,
          isIncorrectlyAnswered,
          isUnanswered
        )[0];
  }
);
