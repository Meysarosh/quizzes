import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUserData = createAsyncThunk(
  'updateUserData',
  async function (newData, { getState, rejectWithValue }) {
    const { token } = getState().token;
    const { user } = getState().user;
    const password = user.username;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await axios
      .put(
        `http://localhost:3000/users/${user.id}`,
        { ...user, password, ...newData },
        {
          headers: headers,
        }
      )
      .catch(function (error) {
        if (error.response && typeof error.response.data == 'string')
          throw rejectWithValue(error.response.data);
        else throw rejectWithValue(error.code);
      });
    return response.data;
  }
);
