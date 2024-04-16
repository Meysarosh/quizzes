import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAvailableQuestionsQuantity = createAsyncThunk(
  'getAvailableQuestionsQuantity',
  async function ({ token, filters }, { rejectWithValue }) {
    const { quizBank, topic, difficulty } = filters;
    const difficultiesQuerryString = difficulty.map((el) => `&level=${el}`).join('');

    const response = await axios
      .get(`http://localhost:4000/${quizBank}?topic=${topic}${difficultiesQuerryString ?? ''}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(function (error) {
        if (error.response) throw rejectWithValue(error.response.data);
        else throw rejectWithValue(error.message);
      });

    return response.data.length;
  }
);
