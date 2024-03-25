import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import tokenReducer from './slices/tokenSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
