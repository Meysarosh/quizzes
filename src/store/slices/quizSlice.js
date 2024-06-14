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
  isPending: false,
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
    prepairQuizForCopy(state, action) {
      const length = action.payload ? action.payload.length : state.quiz.questions.length;

      if (action.payload) {
        state.quiz.correctAnswers = action.payload.reduce((acc, curr) => {
          acc.push(state.quiz.correctAnswers[state.quiz.questions.indexOf(curr)]);
          return acc;
        }, []);
        state.quiz.questions = action.payload;
      }
      state.quiz.isFinished = false;
      state.quiz.submittedAnswers = Array(length).fill(null, 0, length);
      state.quiz.date = null;
      state.quiz.id = null;
      state.quiz.filters.quantity = length;
      state.currentQuestion = null;
      state.selectedOptions = [];
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
    builder.addCase(updateQuizData.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(updateQuizData.fulfilled, (state, action) => {
      state.isPending = false;
      state.quiz.submittedAnswers = action.payload.submittedAnswers;
      state.quiz.isFinished = action.payload.isFinished;
    });
    builder.addCase(updateQuizData.rejected, (state) => {
      state.isPending = false;
    });
    builder.addCase(getQuizById.fulfilled, (state, action) => {
      action.payload && (state.quiz = action.payload);
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
