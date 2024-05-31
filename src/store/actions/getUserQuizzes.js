import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserQuizzes = createAsyncThunk(
  'getUserQuizzes',
  async function (_, { getState, rejectWithValue }) {
    const { token } = getState().token;
    const { id } = getState().user.user;
    const response = await axios
      .get(`http://localhost:3000/quizzes?userId=${id}`, {
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

    return response.data;
  }
);
