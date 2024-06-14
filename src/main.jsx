import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import router from './router/AppRouter.jsx';
import { RouterProvider } from 'react-router-dom';
import { store, persistor } from './store/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GlobalStyles, ThemeProvider } from './styles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider>
          <GlobalStyles />
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </ThemeProvider>
      </Provider>
    </PersistGate>
  </React.StrictMode>
);
