import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import tokenReducer from './slices/tokenSlice';
import filtersReducer from './slices/filtersSlice';
import quizReducer from './slices/quizSlice';
import userQuizzesReducer from './slices/userQuizzesSlice';
import summaryReducer from './slices/summarySlice';
import highlightReducer from './slices/highlightSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  filters: filtersReducer,
  quiz: quizReducer,
  userQuizzes: userQuizzesReducer,
  summary: summaryReducer,
  highlight: highlightReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
