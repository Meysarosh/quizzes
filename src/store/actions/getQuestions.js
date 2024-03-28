import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getQuestions = createAsyncThunk(
  'getQuestions',
  async function (token, { rejectWithValue }) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await axios
      .get('http://localhost:3000/data', {
        headers: headers,
      })
      .catch(function (error) {
        if (error.response) throw rejectWithValue(error.response.data);
        else throw rejectWithValue(error.message);
      });

    return response.data;
  }
);
