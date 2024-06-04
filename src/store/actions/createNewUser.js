import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { tokenStringify } from '../../utils/helperFunctions/tokenRefresh';

export const createNewUser = createAsyncThunk(
  'createNewUser',
  async function (data, { rejectWithValue }) {
    const response = await axios
      .post(`${import.meta.env.VITE_URL_DATA}/users`, {
        ...data,
        answeredQuestions: [],
      })
      .catch(function (error) {
        if (error.response && typeof error.response.data == 'string')
          throw rejectWithValue(error.response.data);
        else throw rejectWithValue(error.code);
      });
    return {
      ...response.data,
      refreshToken: tokenStringify(data.password, response.data.accessToken),
    };
  }
);
