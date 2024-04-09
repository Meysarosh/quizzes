import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUserData = createAsyncThunk(
  'updateUserData',
  async function (data, { rejectWithValue }) {
    const { token, id, fullname, email, username, password, img, dateofbirth } = data;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await axios
      .put(
        `http://localhost:3000/users/${id}`,
        {
          fullname,
          email,
          username,
          password,
          img,
          dateofbirth,
        },
        {
          headers: headers,
        }
      )
      .catch(function (error) {
        if (error.response) throw rejectWithValue(error.response.data);
        throw rejectWithValue(error.message);
      });

    return response.data;
  }
);
