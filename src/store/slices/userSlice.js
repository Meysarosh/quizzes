import { createSlice } from '@reduxjs/toolkit';
import { createNewUser, login, updateUserData } from '../actions';

const initialState = { user: {}, error: null, message: null, history: [] };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addLocation(state, action) {
      state.history.length > 10 && state.history.shift();
      state.history.at(-1) != action.payload && state.history.push(action.payload);
    },
  },
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
  },
});

export default userSlice.reducer;
export const { addLocation } = userSlice.actions;
