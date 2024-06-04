import { createAsyncThunk } from '@reduxjs/toolkit';

export const getPaginatedTopics = createAsyncThunk(
  'getPaginatedTopics',
  async function (nextLoad, { getState, rejectWithValue }) {
    const { token } = getState().token;

    const response = await fetch(`${import.meta.env.VITE_URL_QUESTIONS}/topics?${nextLoad}`, {
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
