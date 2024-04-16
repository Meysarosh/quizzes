import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateQuizData = createAsyncThunk(
  'updateQuizData',
  async function (data, { rejectWithValue }) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`,
    };

    const response = await axios
      .put(`http://localhost:3000/quizzes/${data.quiz.id}`, data.quiz, {
        headers: headers,
      })
      .catch(function (error) {
        if (error.response) throw rejectWithValue(error.response.data);
        else throw rejectWithValue(error.message);
      });

    return response.data;
  }
);
