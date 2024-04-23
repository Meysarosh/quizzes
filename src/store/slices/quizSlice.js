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
    prepairQuizForCopy(state) {
      state.quiz.isFinished = false;
      state.quiz.submittedAnswers = Array(state.quiz.questions.length).fill(
        null,
        0,
        state.quiz.questions.length
      );
      state.quiz.date = null;
      state.quiz.id = null;
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
      if (!action.payload.isFinished) state.quiz.submittedAnswers = action.payload.submittedAnswers;
    });
    builder.addCase(getQuizById.fulfilled, (state, action) => {
      if (action.payload) state.quiz = action.payload;
    });
    builder.addCase(getQuestion.fulfilled, (state, action) => {
      state.currentQuestion = action.payload;
      state.quiz.questions.push(action.payload.id);
      state.quiz.correctAnswers.push(action.payload.correct_answer);
    });
    builder.addCase(getQuestionById.fulfilled, (state, action) => {
      state.currentQuestion = action.payload[0];
    });
  },
});

export default quizSlice.reducer;
export const { endQuiz, setSelectedOptions, prepairQuizForCopy } = quizSlice.actions;
