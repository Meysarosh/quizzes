import { createAsyncThunk } from '@reduxjs/toolkit';

export const getPaginatedTopics = createAsyncThunk(
  'getPaginatedTopics',
  async function (nextLoad, { getState, rejectWithValue }) {
    const { token } = getState().token;

    const response = await fetch(`http://localhost:4000/topics?${nextLoad}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.ok) {
      const headers = response.headers.get('Link');
      const data = await response.json();
      return { data, headers };
    } else {
      throw rejectWithValue(response.statusText);
    }
  }
);
