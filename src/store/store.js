import { configureStore } from '@reduxjs/toolkit';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { persistedReducer } from './persistedReducer';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

const { createReduxHistory, routerMiddleware } = createReduxHistoryContext({
  history: createBrowserHistory(),
  oldLocationChangePayload: true,
  showHistoryAction: true,
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
    }).concat(routerMiddleware),
  devTools: true,
});

export const persistor = persistStore(store);
export const history = createReduxHistory(store);
