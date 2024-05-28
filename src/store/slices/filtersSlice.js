import { createSlice } from '@reduxjs/toolkit';
import { getAvailableQuestions, getQuestionsBanksAndTopics, getPaginatedTopics } from '../actions/';

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
    multiAnswer: 'all',
  },
  availableQuestionsQuantity: null,
  isAvailableQuestionsByAnswer: { unanswered: true, correct: true, incorrect: true },
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setQuizBankFilter(state, action) {
      state.selectedFilters = {
        ...initialState.selectedFilters,
        quizBank: !action.payload ? null : action.payload,
      };
      state.availableQuestionsQuantity = null;
      !action.payload && (state.availableTopics = []);
    },
    setQuizTopicFilter(state, action) {
      state.selectedFilters.topic = action.payload;
    },
    setDifficultyFilter(state, action) {
      state.selectedFilters.difficulty = action.payload.length > 0 ? action.payload : [];
      if (action.payload.length === 0) {
        state.availableTopics = [];
        state.availableQuestionsQuantity = 0;
      }
    },
    setMultiAnswer(state, action) {
      state.selectedFilters.multiAnswer = action.payload;
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
    });
    builder.addCase(getPaginatedTopics.fulfilled, (state, action) => {
      state.availableTopics = state.availableTopics.find(
        ({ topic }) => topic === action.payload.data[0].topic
      )
        ? state.availableTopics
        : state.availableTopics.concat(action.payload.data);
    });
    builder.addCase(getAvailableQuestions.fulfilled, (state, action) => {
      if (state.selectedFilters.quizBank) {
        state.availableQuestionsQuantity = action.payload.data.length;
        state.availableTopics = readAvailableTopics(
          state.selectedFilters.quizBank,
          action.payload.data
        );
      }
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
  setQuizTopicFilter,
  setDifficultyFilter,
  setQuantityFilter,
  setIsCorrectlyAnswered,
  setIsIncorrectlyAnswered,
  setIsUnanswered,
  setMultiAnswer,
} = filtersSlice.actions;
