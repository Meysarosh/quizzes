import { createSlice } from '@reduxjs/toolkit';
import { getQuestionsForSummary } from '../actions';

const summarySlice = createSlice({
  name: 'summary',
  initialState: { questions: [], correctlyAnsweredQid: [], incorrectlyAnsweredQid: [] },
  reducers: {
    createSummaryResults(state, action) {
      action.payload.forEach((answer, id) => {
        state.questions[id].correct_answer === answer
          ? state.correctlyAnsweredQid.push(state.questions[id].id)
          : state.incorrectlyAnsweredQid.push(state.questions[id].id);
      });
    },
    resetSummary(state) {
      state.questions = [];
      state.correctlyAnsweredQid = [];
      state.incorrectlyAnsweredQid = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQuestionsForSummary.fulfilled, (state, action) => {
      state.correctlyAnsweredQid = [];
      state.incorrectlyAnsweredQid = [];
      state.questions = action.payload;
    });
  },
});

export default summarySlice.reducer;
export const { createSummaryResults, resetSummary } = summarySlice.actions;
