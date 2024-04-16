import { createSlice } from '@reduxjs/toolkit';
import { createNewQuiz, getQuestion, getQuestionById, updateQuizData, login } from '../actions';
import { getQuizById } from '../actions/getQuizById';

const initialState = {
  quiz: {
    userId: null,
    isFinished: false,
    filters: {
      quizBank: null,
      topic: null,
      difficulty: [],
      quantity: null,
    },
    questions: [],
    submittedAnswers: [],
    correctAnswers: [],
    date: null,
  },
  currentQuestion: null,
  selectedOptions: [],
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    endQuiz(state) {
      state.quiz = initialState.quiz;
      state.currentQuestion = null;
      state.selectedOptions = [];
    },
    setSelectedOptions(state, action) {
      state.selectedOptions[action.payload.idx] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state) => {
      state.quiz = initialState.quiz;
      state.currentQuestion = null;
      state.selectedOptions = [];
    });
    builder.addCase(createNewQuiz.fulfilled, (state, action) => {
      state.quiz = action.payload;
    });
    builder.addCase(updateQuizData.fulfilled, (state, action) => {
      state.quiz.submittedAnswers = action.payload.submittedAnswers;
    });
    builder.addCase(getQuizById.fulfilled, (state, action) => {
      state.quiz = action.payload;
    });
    builder.addCase(getQuestion.fulfilled, (state, action) => {
      state.currentQuestion = action.payload[0];
      state.quiz.questions.push(action.payload[0].id);
      state.quiz.correctAnswers.push(action.payload[0].correct_answer);
    });
    builder.addCase(getQuestionById.fulfilled, (state, action) => {
      state.currentQuestion = action.payload[0];
    });
  },
});

export default quizSlice.reducer;
export const { endQuiz, setSelectedOptions } = quizSlice.actions;
