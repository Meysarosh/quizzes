import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getQuizById = createAsyncThunk(
  'getQuizById',
  async function ({ id }, { getState, rejectWithValue }) {
    const { token } = getState().token;

    const response = await axios
      .get(`${import.meta.env.VITE_URL_DATA}/quizzes?id=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(function (error) {
        if (error.response && typeof error.response.data == 'string')
          throw rejectWithValue(error.response.data);
        else throw rejectWithValue(error.code);
      });

    return response.data[0];
  }
);
