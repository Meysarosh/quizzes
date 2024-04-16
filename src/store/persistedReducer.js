import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import tokenReducer from './slices/tokenSlice';
import questionsReducer from './slices/questionsSlice';
import quizReducer from './slices/quizSlice';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

export const { routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  questions: questionsReducer,
  quiz: quizReducer,
  router: routerReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
