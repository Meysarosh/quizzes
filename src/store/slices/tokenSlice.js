import { createSlice } from '@reduxjs/toolkit';
import { createNewUser } from '../actions';

const initialState = { token: null };

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
    });
  },
});

export default tokenSlice.reducer;
