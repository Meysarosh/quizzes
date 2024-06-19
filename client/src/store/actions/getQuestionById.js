import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getQuestionById = createAsyncThunk(
  'getQuestionById',
  async function ({ id }, { getState, rejectWithValue }) {
    const { token } = getState().token;
    const { quizBank } = getState().quiz.quiz.filters;

    const response = await axios
      .get(`${import.meta.env.VITE_URL_QUESTIONS}/${quizBank}?id=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(function (error) {
        if (error.response) throw rejectWithValue(error.response.data);
        else throw rejectWithValue(error.message);
      });

    return response.data;
  }
);
