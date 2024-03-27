import { createSlice } from '@reduxjs/toolkit';
import { createNewUser, login } from '../actions';

const initialState = { token: null };

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
    });
    builder.addCase(createNewUser.rejected, (state) => {
      state.token = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
    });
    builder.addCase(login.rejected, (state) => {
      state.token = null;
    });
  },
});

export default tokenSlice.reducer;
