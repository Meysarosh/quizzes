import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('login', async function (data, { rejectWithValue }) {
  const { email, password } = data;
  const response = await axios
    .post('http://localhost:3000/login', {
      email,
      password,
    })
    .catch(function (error) {
      if (error.response) throw rejectWithValue(error.response.data);
      else throw rejectWithValue(error.message);
    });

  return response.data;
});
