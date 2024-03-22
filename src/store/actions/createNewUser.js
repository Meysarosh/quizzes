import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createNewUser = createAsyncThunk('', async function (data, { rejectWithValue }) {
  const { fullname, email, username, password } = data;
  const response = await axios
    .post('http://localhost:3000/users', {
      fullname,
      email,
      username,
      password,
    })
    .catch(function (error) {
      if (error.response) throw rejectWithValue(error.response.data);
      else throw rejectWithValue(error.message);
    });

  return response.data;
});
