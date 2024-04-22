import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getQuestionsBanksAndTopics = createAsyncThunk(
  'getQuestionsBanksAndTopics',
  async function ({ token }, { rejectWithValue }) {
    const response = await axios
      .get(`http://localhost:4000/structure`, {
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
