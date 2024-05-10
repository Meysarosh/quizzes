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
  highlight: {
    isHighlight: false,
    highlighted: [],
  },
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
    switchHighlight(state) {
      state.highlight.isHighlight = !state.highlight.isHighlight;
    },
    addHighlighted(state, action) {
      const index = state.highlight.highlighted.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.highlight.highlighted[index].range = addRange(
          state.highlight.highlighted[index].range,
          action.payload.range
        );
      } else
        state.highlight.highlighted.push({ id: action.payload.id, range: [action.payload.range] });
    },
    removeHighlighted(state, action) {
      const index = state.highlight.highlighted.findIndex((el) => el.id === action.payload.id);
      state.highlight.highlighted[index].range.splice(action.payload.idx, 1);
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
      state.quiz.isFinished = action.payload.isFinished;
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
export const {
  endQuiz,
  setSelectedOptions,
  prepairQuizForCopy,
  switchHighlight,
  addHighlighted,
  removeHighlighted,
} = quizSlice.actions;

function addRange(prevRanges, newRange) {
  const tempSet = prevRanges.reduce((acc, curr) => {
    let tempNum = curr[0];

    while (tempNum < curr[1] + 1) {
      acc.add(tempNum);
      tempNum += 1;
    }

    return acc;
  }, new Set());

  let tempNum2 = newRange[0];

  while (tempNum2 < newRange[1] + 1) {
    tempSet.add(tempNum2);
    tempNum2 += 1;
  }

  const tempArr = [...tempSet];
  tempArr.sort((a, b) => a - b);

  const resultArr = [];
  let idx = 0;

  while (idx < tempArr.length) {
    const start = tempArr[idx];

    while (tempArr[idx] + 1 === tempArr[idx + 1] && idx + 1 < tempArr.length) idx += 1;

    const end = tempArr[idx];
    resultArr.push([start, end]);

    idx += 1;
  }

  return resultArr;
}
