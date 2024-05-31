import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import React from 'react';
import App from '../App.jsx';
import router from '../router/AppRouter.jsx';
import { RouterProvider } from 'react-router-dom';
import { store, persistor } from '../store/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GlobalStyles, ThemeProvider } from '../styles';

describe('Router', () => {
  it('unauthorized user should be redirected to login page', async () => {
    const { findByRole } = render(
      <React.StrictMode>
        <GlobalStyles />
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            <ThemeProvider>
              <RouterProvider router={router}>
                <App />
              </RouterProvider>
            </ThemeProvider>
          </Provider>
        </PersistGate>
      </React.StrictMode>
    );

    const homePageHeader = await findByRole('heading', { name: 'Login' });
    expect(homePageHeader).toBeInTheDocument();
  });
});
