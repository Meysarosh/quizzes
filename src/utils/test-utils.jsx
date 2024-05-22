import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';
import { ThemeProvider } from '../styles/ThemeProvider';
import { PropTypes } from 'prop-types';

export function renderWithProviders(ui, extendedRenderOptions = {}) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );

  Wrapper.propTypes = {
    children: PropTypes.element,
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
