import { createSlice } from '@reduxjs/toolkit';
import { getQuestions } from '../actions';

const initialState = {
  questions: [],
  filteredQuestions: [],
  quizBanks: [],
  difficulties: {
    React: ['Beginner', 'Easy', 'Intermediate', 'Advanced'],
    Other: ['Easy', 'Medium', 'Hard'],
  },
  filters: { quizBank: null, difficulty: [], quantity: null },
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuizBankFilter(state, action) {
      if (action.payload === '') {
        state.filters.quizBank = null;
        state.filters.difficulty = [];
      } else {
        state.filters.quizBank = action.payload;
      }
    },
    filterByQuizBank(state) {
      if (state.filters.quizBank === null) state.filteredQuestions = state.questions;
      else
        state.filteredQuestions = state.questions.filter(
          (question) => question.title === state.filters.quizBank
        );
    },
    setDifficultyFilterAll(state, action) {
      state.filters.difficulty = action.payload;
    },
    setDifficultyFilter(state, action) {
      const idx = state.filters.difficulty.indexOf(action.payload);
      if (idx < 0) state.filters.difficulty.push(action.payload);
      else state.filters.difficulty.splice(idx, 1);
    },
    filterByDifficulty(state) {
      if (state.filters.quizBank === null) state.filteredQuestions = state.questions;
      else {
        const filteredByBank = state.questions.filter(
          (question) => question.title === state.filters.quizBank
        );
        state.filteredQuestions = filteredByBank.filter((question) =>
          state.filters.difficulty.includes(question.level)
        );
      }
    },
    setQuantityFilter(state, action) {
      if (action.payload === '') state.filters.quantity = null;
      else state.filters.quantity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      state.questions = processData(action.payload);
      state.quizBanks = readQuizBanks(action.payload);
      state.filteredQuestions = processData(action.payload);
    });
  },
});

function processData(data) {
  const questions = [];
  const entries = Object.entries(data);

  entries.forEach((entry) => {
    const title = entry[0];
    entry[1].forEach((question) => {
      questions.push({ ...question, title: title });
    });
  });

  return questions;
}

function readQuizBanks(data) {
  const quizBanks = Object.keys(data);
  return quizBanks;
}

export default questionsSlice.reducer;
export const {
  setQuizBankFilter,
  filterByQuizBank,
  setDifficultyFilterAll,
  setDifficultyFilter,
  filterByDifficulty,
  setQuantityFilter,
} = questionsSlice.actions;
