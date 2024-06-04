import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createNewQuiz = createAsyncThunk(
  'createNewQuiz',
  async function (data, { getState, rejectWithValue }) {
    const { token } = getState().token;
    const { user } = getState().user;
    const { quiz } = getState().quiz;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await axios
      .post(
        `${import.meta.env.VITE_URL_DATA}/quizzes`,
        {
          ...quiz,
          userId: user.id,
          date: Date.now(),
          filters: data ? data.filters : quiz.filters,
        },
        {
          headers: headers,
        }
      )
      .catch(function (error) {
        if (error.response) throw rejectWithValue(error.response.data);
        else throw rejectWithValue(error.message);
      });

    return response.data;
  }
);
