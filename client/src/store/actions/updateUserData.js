import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { tokenParse } from '../../utils/helperFunctions/tokenRefresh';

export const updateUserData = createAsyncThunk(
  'updateUserData',
  async function (newData, { getState, rejectWithValue }) {
    const { token, refreshToken } = getState().token;
    const { user } = getState().user;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await axios
      .put(
        `${import.meta.env.VITE_URL_DATA}/users/${user.id}`,
        { ...user, password: tokenParse(refreshToken), ...newData },
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
