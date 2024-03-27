import { createSlice } from '@reduxjs/toolkit';
import { getData } from '../actions';

const initialState = { data: {} };

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = processData(action.payload);
    });
  },
});

export default dataSlice.reducer;

function processData(data) {
  const topics = [];
  const difficultiesSet = new Set();

  const entries = Object.entries(data);

  entries.forEach((entry) => {
    const curTopicsSet = new Set();
    const title = entry[0];
    entry[1].forEach((question) => {
      curTopicsSet.add(question.topic);
      difficultiesSet.add(question.level);
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

  return { topics, difficultiesSet: [...difficultiesSet] };
}
