import { createSlice } from '@reduxjs/toolkit';
import {
  createNewUser,
  login,
  updateUserData,
  updateQuizData,
  getQuizById,
  getPaginatedTopics,
  getQuestion,
  getUserQuizzes,
} from '../actions';

const initialState = { user: {}, error: null, message: null, history: [], darkMode: false };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addLocation(state, action) {
      state.history.length > 10 && state.history.shift();
      state.history.at(-1) != action.payload && state.history.push(action.payload);
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
    builder.addCase(createNewUser.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.message = `Welcome back, ${action.payload.user.fullname.split(' ')[0]}!`;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload;
    });
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.user = { ...action.payload, password: 'try to guess' };
      state.history.at(-1).includes('profile') &&
        (state.message = 'Your data updated successfully!');
    });
    builder.addCase(updateUserData.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updateQuizData.fulfilled, (state, action) => {
      action.payload.isFinished &&
        (state.message = 'Congratulation! You have successfully finished the quiz!');
    });
    builder.addCase(updateQuizData.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getQuizById.fulfilled, (state, action) => {
      !action.payload && (state.error = 'Quiz Not Found');
    });
    builder.addCase(getQuizById.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getQuestion.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getPaginatedTopics.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getUserQuizzes.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
export const { addLocation, setUserMessage, setUserError, resetUserMessage, setDarkMode } =
  userSlice.actions;
