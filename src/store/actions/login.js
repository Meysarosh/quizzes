import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('login', async function (data, { rejectWithValue }) {
  const response = await axios
    .post('http://localhost:3000/login', { ...data })
    .catch(function (error) {
      if (error.response && typeof error.response.data == 'string')
        throw rejectWithValue(error.response.data);
      else throw rejectWithValue(error.code);
    });

  return response.data;
});
