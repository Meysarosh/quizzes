import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createNewUser = createAsyncThunk(
  'createNewUser',
  async function (data, { rejectWithValue }) {
    const response = await axios
      .post('http://localhost:3000/users', {
        ...data,
        answeredQuestions: [],
      })
      .catch(function (error) {
        if (error.response && typeof error.response.data == 'string')
          throw rejectWithValue(error.response.data);
        else throw rejectWithValue(error.code);
      });
    return response.data;
  }
);
