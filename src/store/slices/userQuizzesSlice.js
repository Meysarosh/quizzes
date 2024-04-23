import { createSlice } from '@reduxjs/toolkit';
import { getUserQuizzes } from '../actions/getUserQuizzes';

const initialState = {
  quizzes: [],
};

export const userQuizzes = createSlice({
  name: 'userQuizzes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserQuizzes.fulfilled, (state, action) => {
      state.quizzes = processData(action.payload);
    });
  },
});

export default userQuizzes.reducer;

function processData(data) {
  return data.reduce((acc, curr) => {
    const count = curr.submittedAnswers.reduce((acc, num, idx) => {
      if (num === curr.correctAnswers[idx]) acc += 1;
      return acc;
    }, 0);
    acc.push({
      quizId: curr.id,
      date: curr.date,
      quizBank: curr.filters.quizBank,
      topic: curr.filters.topic,
      questionsQuantity: curr.filters.quantity,
      correctAnswersQuantity: count,
      isFinished: curr.isFinished,
    });
    return acc;
  }, []);
}
