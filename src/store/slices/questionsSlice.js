import { createSlice } from '@reduxjs/toolkit';
import { getQuestions } from '../actions';

const initialState = { questions: {} };

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      state.questions = processData(action.payload);
    });
  },
});

function processData(data) {
  const topics = [];

  const entries = Object.entries(data);

  entries.forEach((entry) => {
    const curTopicsSet = new Set();
    const title = entry[0];
    entry[1].forEach((question) => {
      curTopicsSet.add(question.topic);
    });

    curTopicsSet.forEach((topic) => {
      const topicQuestions = entry[1].filter((question) => question.topic === topic);
      topics.push({
        title,
        topic,
        questions: topicQuestions,
      });
    });
  });

  return { topics };
}

export default questionsSlice.reducer;
