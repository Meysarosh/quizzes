import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getQuestionsForSummary = createAsyncThunk(
  'getQuestionsForSummary',
  async function ({ token, questions, quizBank }, { rejectWithValue }) {
    const questionsQuerryString = questions.map((q) => `&id=${q}`).join('');

    const response = await axios
      .get(`http://localhost:4000/${quizBank}?${questionsQuerryString}`, {
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
