import { createSlice } from '@reduxjs/toolkit';
import { getQuestionsForSummary } from '../actions';

const summarySlice = createSlice({
  name: 'summary',
  initialState: {
    questions: [],
    correctlyAnsweredQid: [],
    incorrectlyAnsweredQid: [],
    unansweredQid: [],
    partialyAnsweredQ: [],
  },
  reducers: {
    createSummaryResults(state, action) {
      action.payload.forEach((answer, id) => {
        if (answer) {
          if (state.questions[id].isMulti) {
            const answersSet = answer
              ? new Set([...state.questions[id].correct_answer, ...answer])
              : null;
            if (
              answer &&
              answersSet.size === state.questions[id].correct_answer.length &&
              answersSet.size === answer.length
            )
              state.correctlyAnsweredQid.push(state.questions[id].id);
            else if (
              !answer ||
              answersSet.size === answer.length + state.questions[id].correct_answer.length
            )
              state.incorrectlyAnsweredQid.push(state.questions[id].id);
            else {
              const correctAnswers = [];
              const incorrectAnswers = [];
              answer.forEach((el) =>
                state.questions[id].correct_answer.includes(el)
                  ? correctAnswers.push(el)
                  : incorrectAnswers.push(el)
              );
              state.partialyAnsweredQ.push({
                id: state.questions[id].id,
                result:
                  correctAnswers.length + incorrectAnswers.length ===
                  Object.entries(state.questions[id].answers).length
                    ? 0
                    : correctAnswers.length + incorrectAnswers.length >
                        state.questions[id].correct_answer.length
                      ? correctAnswers.length /
                        (state.questions[id].correct_answer.length + incorrectAnswers.length)
                      : correctAnswers.length / state.questions[id].correct_answer.length,
                correctAnswers,
                incorrectAnswers,
              });
            }
          } else
            state.questions[id].correct_answer === answer
              ? state.correctlyAnsweredQid.push(state.questions[id].id)
              : state.incorrectlyAnsweredQid.push(state.questions[id].id);
        } else state.unansweredQid.push(state.questions[id].id);
      });
    },
    resetSummary(state) {
      state.questions = [];
      state.correctlyAnsweredQid = [];
      state.incorrectlyAnsweredQid = [];
      state.partialyAnsweredQ = [];
      state.unansweredQid = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQuestionsForSummary.fulfilled, (state, action) => {
      state.correctlyAnsweredQid = [];
      state.incorrectlyAnsweredQid = [];
      state.partialyAnsweredQ = [];
      state.unansweredQid = [];
      state.questions = action.payload;
    });
  },
});

export default summarySlice.reducer;
export const { createSummaryResults, resetSummary } = summarySlice.actions;
