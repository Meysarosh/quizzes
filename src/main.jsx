import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import router from './router/AppRouter.jsx';
import { RouterProvider } from 'react-router-dom';
import { store, persistor, history } from './store/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GlobalStyles, ThemeProvider } from './styles';
import { HistoryRouter } from 'redux-first-history/rr6';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles />
    <ThemeProvider>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <RouterProvider router={router}>
            <HistoryRouter history={history}>
              <App />
            </HistoryRouter>
          </RouterProvider>
        </Provider>
      </PersistGate>
    </ThemeProvider>
  </React.StrictMode>
);
