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
      state.filters.quizBank = !action.payload ? null : action.payload;
      if (!action.payload) {
        state.filters.difficulty = [];
        state.filters.quantity = null;
      }
    },
    filterByQuizBank(state) {
      state.filteredQuestions = state.filters.quizBank
        ? state.questions.filter((question) => question.title === state.filters.quizBank)
        : state.questions;
    },
    setDifficultyFilterAll(state, action) {
      if (state.filters.quizBank) state.filters.difficulty = action.payload;
    },
    setDifficultyFilter(state, action) {
      const idx = state.filters.difficulty.indexOf(action.payload);
      idx < 0
        ? state.filters.difficulty.push(action.payload)
        : state.filters.difficulty.splice(idx, 1);
    },
    filterByDifficulty(state) {
      state.filteredQuestions = !state.filters.quizBank
        ? state.questions
        : state.questions
            .filter((question) => question.title === state.filters.quizBank)
            .filter((question) => state.filters.difficulty.includes(question.level));
    },
    setQuantityFilter(state, action) {
      state.filters.quantity = action.payload === '' ? null : action.payload;
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
  return Object.keys(data).reduce((acc, curr) => {
    return acc.concat(data[curr].map((q) => ({ ...q, title: curr })));
  }, []);
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
