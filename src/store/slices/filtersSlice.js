import { createSlice } from '@reduxjs/toolkit';
import { getAvailableQuestions, getQuestionsBanksAndTopics } from '../actions/';

const initialState = {
  quizBanks: [],
  quizTopics: [],
  availableTopics: [],
  difficulties: {
    React: ['Beginner', 'Easy', 'Intermediate', 'Advanced'],
    Other: ['Easy', 'Medium', 'Hard'],
  },
  selectedFilters: {
    quizBank: null,
    topic: null,
    difficulty: [],
    quantity: null,
    isCorrectlyAnswered: true,
    isIncorrectlyAnswered: true,
    isUnanswered: true,
  },
  availableQuestionsQuantity: null,
  isAvailableQuestionsByAnswer: { unanswered: true, correct: true, incorrect: true },
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setQuizBankFilter(state, action) {
      state.selectedFilters.quizBank = !action.payload ? null : action.payload;
      state.selectedFilters.topic = null;
      state.selectedFilters.difficulty = [];
      state.selectedFilters.quantity = null;
      state.selectedFilters.isCorrectlyAnswered = true;
      state.selectedFilters.isIncorrectlyAnswered = true;
      state.selectedFilters.isUnanswered = true;
      state.availableQuestionsQuantity = null;
    },
    filterByQuizBank(state) {
      state.availableTopics = state.selectedFilters.quizBank
        ? state.quizTopics.filter(({ title }) => state.selectedFilters.quizBank === title)
        : state.quizTopics;
    },
    setQuizTopicFilter(state, action) {
      state.selectedFilters.topic = action.payload;
    },
    filterByQuizTopic(state) {
      state.availableTopics = state.selectedFilters.topic
        ? state.quizTopics.filter(
            ({ title, topic }) =>
              state.selectedFilters.quizBank === title && state.selectedFilters.topic === topic
          )
        : state.quizTopics.filter(({ title }) => state.selectedFilters.quizBank === title);
    },
    setDifficultyFilterAll(state, action) {
      if (state.selectedFilters.quizBank) state.selectedFilters.difficulty = action.payload;
    },
    filterByDifficultyAll(state, action) {
      state.availableTopics = action.payload
        ? state.quizTopics.filter(
            ({ title, topic }) =>
              state.selectedFilters.quizBank === title && state.selectedFilters.quizTopic === topic
          )
        : [];
      if (!action.payload) state.availableQuestionsQuantity = 0;
    },
    setDifficultyFilter(state, action) {
      const idx = state.selectedFilters.difficulty.indexOf(action.payload);
      if (idx > -1 && state.selectedFilters.difficulty.length === 1) {
        state.availableTopics = [];
        state.availableQuestionsQuantity = 0;
      }
      idx < 0
        ? state.selectedFilters.difficulty.push(action.payload)
        : state.selectedFilters.difficulty.splice(idx, 1);
    },
    setQuantityFilter(state, action) {
      state.selectedFilters.quantity = action.payload === '' ? null : action.payload;
    },
    setIsCorrectlyAnswered(state) {
      state.selectedFilters.isCorrectlyAnswered = !state.selectedFilters.isCorrectlyAnswered;
    },
    setIsIncorrectlyAnswered(state) {
      state.selectedFilters.isIncorrectlyAnswered = !state.selectedFilters.isIncorrectlyAnswered;
    },
    setIsUnanswered(state) {
      state.selectedFilters.isUnanswered = !state.selectedFilters.isUnanswered;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQuestionsBanksAndTopics.fulfilled, (state, action) => {
      state.quizBanks = Object.keys(action.payload);
      state.quizTopics = processData(action.payload);
      state.availableTopics = processData(action.payload);
    });
    builder.addCase(getAvailableQuestions.fulfilled, (state, action) => {
      state.availableQuestionsQuantity = action.payload.data.length;
      state.availableTopics = readAvailableTopics(
        state.selectedFilters.quizBank,
        action.payload.data
      );
      state.isAvailableQuestionsByAnswer = action.payload.isAvailableQuestionsByAnswer;
    });
  },
});

function processData(data) {
  return Object.keys(data).reduce((acc, curr) => {
    return acc.concat(data[curr].map((topic) => ({ topic, title: curr })));
  }, []);
}

function readAvailableTopics(bank, data) {
  return [
    ...data.reduce((acc, curr) => {
      return acc.add(curr.topic);
    }, new Set()),
  ].map((topic) => ({ title: bank, topic }));
}

export default filtersSlice.reducer;
export const {
  setQuizBankFilter,
  filterByQuizBank,
  setDifficultyFilterAll,
  setDifficultyFilter,
  filterByDifficultyAll,
  setQuantityFilter,
  setIsCorrectlyAnswered,
  setIsIncorrectlyAnswered,
  setIsUnanswered,
  setQuizTopicFilter,
} = filtersSlice.actions;
