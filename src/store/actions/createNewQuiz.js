import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createNewQuiz = createAsyncThunk(
  'createNewQuiz',
  async function ({ token, quiz }, { rejectWithValue }) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await axios
      .post('http://localhost:3000/quizzes', quiz, {
        headers: headers,
      })
      .catch(function (error) {
        if (error.response) throw rejectWithValue(error.response.data);
        else throw rejectWithValue(error.message);
      });

    return response.data;
  }
);
