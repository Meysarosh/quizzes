import { createSlice } from '@reduxjs/toolkit';
import { addRange } from '../../utils/helperFunctions/addRange';

const initialState = {
  highlight: {
    isHighlight: false,
    highlighted: [],
  },
};

export const highlightSlice = createSlice({
  name: 'highlight',
  initialState,
  reducers: {
    resetHighlight(state) {
      state.highlight = initialState.highlight;
    },
    switchHighlight(state) {
      state.highlight.isHighlight = !state.highlight.isHighlight;
    },
    addHighlighted(state, action) {
      const index = state.highlight.highlighted.findIndex((el) => el.id === action.payload.id);
      const { id, range, text } = action.payload;

      index > -1
        ? (state.highlight.highlighted[index].range = addRange(
            state.highlight.highlighted[index].range,
            range
          ))
        : state.highlight.highlighted.push({ id, range: [range], text });
    },
    removeHighlighted(state, action) {
      const index = state.highlight.highlighted.findIndex((el) => el.id === action.payload.id);
      state.highlight.highlighted[index].range.splice(action.payload.idx, 1);
    },
  },
});

export default highlightSlice.reducer;
export const { switchHighlight, addHighlighted, removeHighlighted, resetHighlight } =
  highlightSlice.actions;
