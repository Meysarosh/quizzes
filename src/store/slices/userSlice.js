import { createSlice } from '@reduxjs/toolkit';
import { createNewUser } from '../actions';

const initialState = { user: {} };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});

export default userSlice.reducer;
