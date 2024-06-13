import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createString } from '../../utils/helperFunctions/createStringFromIds';

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

    const questionsFilterByUserAnswerQueryString = createString(
      isCorrectlyAnswered,
      isIncorrectlyAnswered,
      isUnanswered,
      answeredQuestions[quizBank],
      questions
    );

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
        `${import.meta.env.VITE_URL_QUESTIONS}/${quizBank}?topic=${topic}${difficultiesQueryString ?? ''}${multi}${prevQuestionsFilterQueryString ?? ''}${questionsFilterByUserAnswerQueryString}&_limit=1`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch(function (error) {
        if (error.response && typeof error.response.data == 'string')
          throw rejectWithValue(error.response.data);
        else throw rejectWithValue(error.code);
      });

    return response.data[0];
  }
);
