import { createSlice } from '@reduxjs/toolkit';
import { createNewUser, login } from '../actions';

const initialState = { user: {} };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});

export default userSlice.reducer;
