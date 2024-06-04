import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getQuestionsBanksAndTopics = createAsyncThunk(
  'getQuestionsBanksAndTopics',
  async function (_, { getState, rejectWithValue }) {
    const { token } = getState().token;

    const response = await axios
      .get(`${import.meta.env.VITE_URL_QUESTIONS}/structure`, {
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
