import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getQuestion = createAsyncThunk(
  'getOneQuestion',
  async function ({ token, filters, prevQuestions }, { rejectWithValue }) {
    const { quizBank, topic, difficulty } = filters;
    const difficultiesQuerryString = difficulty.map((el) => `&level=${el}`).join('');
    const prevQuestionsFilterQuerryString = prevQuestions.map((id) => `&id_ne=${id}`).join('');

    const response = await axios
      .get(
        `http://localhost:4000/${quizBank}?topic=${topic}${difficultiesQuerryString ?? ''}${prevQuestionsFilterQuerryString ?? ''}&_limit=1`,
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

    return response.data;
  }
);
