import { createSlice } from '@reduxjs/toolkit';
import { createNewUser, login, updateUserData, getQuestions } from '../actions';

const initialState = { user: {}, error: null, message: null };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(createNewUser.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload;
    });
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.user = { ...action.payload, password: 'try to guess' };
      state.error = null;
    });
    builder.addCase(updateUserData.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getQuestions.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
