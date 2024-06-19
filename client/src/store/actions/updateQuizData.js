import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateQuizData = createAsyncThunk(
  'updateQuizData',
  async function (data, { getState, rejectWithValue }) {
    const { token } = getState().token;
    const { quiz } = getState().quiz;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await axios
      .put(`${import.meta.env.VITE_URL_DATA}/quizzes/${quiz.id}`, { ...quiz, ...data }, { headers })
      .catch(function (error) {
        if (error.response) throw rejectWithValue(error.response.data);
        else throw rejectWithValue(error.message);
      });

    return response.data;
  }
);
