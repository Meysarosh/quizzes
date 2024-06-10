import { createSlice } from '@reduxjs/toolkit';
import { createNewUser, login, updateUserData, updateQuizData, getQuizById } from '../actions';

const initialState = {
  user: {},
  error: null,
  message: null,
  history: [],
  lastActivity: null,
  darkMode: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addLocation(state, action) {
      state.history.length > 10 && state.history.shift();
      state.history.at(-1) != action.payload && state.history.push(action.payload);
      state.lastActivity = Date.now();
    },
    setUserMessage(state, action) {
      state.message = action.payload;
    },
    setUserError(state, action) {
      state.error = action.payload;
    },
    resetUserMessage(state) {
      state.error = null;
      state.message = null;
    },
    setDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.message = `Congratulation, ${action.payload.user.fullname.split(' ')[0]}! You have successfully registered.`;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.message = `Welcome back, ${action.payload.user.fullname.split(' ')[0]}!`;
    });
    builder.addCase(login.rejected, (state) => {
      state.user = null;
    });
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.user = { ...action.payload, password: 'try to guess' };
      state.history.at(-1).includes('profile') &&
        (state.message = 'Your data updated successfully!');
    });
    builder.addCase(updateQuizData.fulfilled, (state, action) => {
      action.payload.isFinished &&
        (state.message = 'Congratulation! You have successfully finished the quiz!');
    });
    builder.addCase(getQuizById.fulfilled, (state, action) => {
      !action.payload && (state.error = 'Quiz Not Found');
    });
    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        state.error = action.payload;
      }
    );
  },
});

export default userSlice.reducer;
export const { addLocation, setUserMessage, setUserError, resetUserMessage, setDarkMode } =
  userSlice.actions;
