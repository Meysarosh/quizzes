import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders, initialState } from '../../utils/test-utils';
import { Toast } from './Toast';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

const initialStateWithMessage = {
  ...initialState,
  user: {
    ...initialState.user,
    error: 'Error!',
    message: 'Congratulation!',
  },
};

const initialStateWithoutToken = {
  ...initialState,
  token: { token: null },
};

const renderFunction = () =>
  renderWithProviders(
    <MemoryRouter initialEntries={['/home']}>
      <Toast />
    </MemoryRouter>,
    {
      preloadedState: initialStateWithMessage,
    }
  );

describe('Toast', () => {
  it('Message and error should be visible and should be removed after 3s', () => {
    vi.useFakeTimers();

    const { store, getByText } = renderFunction();

    expect(store.getState().user.error).toStrictEqual('Error!');
    expect(store.getState().user.message).toStrictEqual('Congratulation!');

    const error = getByText('Error!');
    const message = getByText('Congratulation!');
    expect(error).toBeInTheDocument();
    expect(message).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(3000));

    vi.waitFor(() => {
      expect(store.getState().user.error).toStrictEqual(null);
      expect(store.getState().user.message).toStrictEqual(null);
    });
  });

  it('Error message should be visible when token is expired', () => {
    const { getByText } = renderWithProviders(
      <MemoryRouter initialEntries={['/home']}>
        <Toast />
      </MemoryRouter>,
      {
        preloadedState: initialStateWithoutToken,
      }
    );

    const error = getByText('Please login to comtinue!');

    expect(error).toBeInTheDocument();
  });
});
