import { createSlice } from '@reduxjs/toolkit';
import { createNewUser, login } from '../actions';

const initialState = { user: {}, error: null };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(createNewUser.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
