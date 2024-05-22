import { createSlice } from '@reduxjs/toolkit';
import {
  createNewUser,
  login,
  updateUserData,
  createNewQuiz,
  getQuestion,
  updateQuizData,
  getQuestionById,
  getQuizById,
  getAvailableQuestions,
  getQuestionsBanksAndTopics,
  getUserQuizzes,
  getQuestionsForSummary,
  getPaginatedTopics,
} from '../actions';

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
    builder.addCase(updateUserData.rejected, (state, action) => {
      if (action.payload === 'jwt expired') state.token = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
    });
    builder.addCase(login.rejected, (state) => {
      state.token = null;
    });
    builder.addCase(createNewQuiz.rejected, (state, action) => {
      if (action.payload === 'jwt expired') state.token = null;
    });
    builder.addCase(updateQuizData.rejected, (state, action) => {
      if (action.payload === 'jwt expired') state.token = null;
    });
    builder.addCase(getQuizById.rejected, (state, action) => {
      if (action.payload === 'jwt expired') state.token = null;
    });
    builder.addCase(getQuestion.rejected, (state, action) => {
      if (action.payload === 'jwt expired') state.token = null;
    });
    builder.addCase(getQuestionById.rejected, (state, action) => {
      if (action.payload === 'jwt expired') state.token = null;
    });
    builder.addCase(getAvailableQuestions.rejected, (state, action) => {
      if (action.payload === 'jwt expired') state.token = null;
    });
    builder.addCase(getQuestionsBanksAndTopics.rejected, (state, action) => {
      if (action.payload === 'jwt expired') state.token = null;
    });
    builder.addCase(getUserQuizzes.rejected, (state, action) => {
      if (action.payload === 'jwt expired') state.token = null;
    });
    builder.addCase(getQuestionsForSummary.rejected, (state, action) => {
      if (action.payload === 'jwt expired') state.token = null;
    });
    builder.addCase(getPaginatedTopics.rejected, (state, action) => {
      action.payload === 'Unauthorized' && (state.token = null);
    });
  },
});

export default tokenSlice.reducer;
