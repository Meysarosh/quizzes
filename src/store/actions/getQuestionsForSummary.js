import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getQuestionsForSummary = createAsyncThunk(
  'getQuestionsForSummary',
  async function (_, { getState, rejectWithValue }) {
    const { token } = getState().token;
    const { questions, filters } = getState().quiz.quiz;
    const questionsQuerryString = questions.map((q) => `&id=${q}`).join('');

    const response = await axios
      .get(`http://localhost:4000/${filters.quizBank}?${questionsQuerryString}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(function (error) {
        if (error.response) throw rejectWithValue(error.response.data);
        else throw rejectWithValue(error.message);
      });

    return placeInOrder(questions, response.data);
  }
);

function placeInOrder(order, questions) {
  const newOrder = [];
  order.forEach((id) => newOrder.push(questions.find((q) => q.id === id)));
  return newOrder;
}
