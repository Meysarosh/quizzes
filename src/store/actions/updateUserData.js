import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUserData = createAsyncThunk(
  'updateUserData',
  async function (data, { rejectWithValue }) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`,
    };

    const response = await axios
      .put(`http://localhost:3000/users/${data.user.id}`, data.user, {
        headers: headers,
      })
      .catch(function (error) {
        if (error.response) throw rejectWithValue(error.response.data);
        throw rejectWithValue(error.message);
      });

    return response.data;
  }
);
