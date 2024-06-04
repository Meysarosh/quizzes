import { createSlice } from '@reduxjs/toolkit';
import { createNewUser, login } from '../actions';

const initialState = { token: null, refreshToken: null };

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(createNewUser.rejected, (state) => {
      state.token = null;
      state.refreshToken = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(login.rejected, (state) => {
      state.token = null;
      state.refreshToken = null;
    });
  },
});

export default tokenSlice.reducer;
export const { logout } = tokenSlice.actions;
