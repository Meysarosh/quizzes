import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getQuestionById = createAsyncThunk(
  'getQuestionById',
  async function ({ token, filters, id }, { rejectWithValue }) {
    const { quizBank } = filters;

    const response = await axios
      .get(`http://localhost:4000/${quizBank}?id=${id}`, {
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