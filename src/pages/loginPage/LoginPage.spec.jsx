import { waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders, initialState } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { LoginPage } from './LoginPage';
import { server } from '../../mocks/server';
import { MemoryRouter } from 'react-router-dom';
import { http } from 'msw';
import * as router from 'react-router';

const loggedOutInitialState = {
  ...initialState,
  token: {
    token: null,
  },
  user: {
    user: {},
    error: null,
    message: null,
    history: [],
  },
};

const renderFunction = () =>
  renderWithProviders(
    <MemoryRouter initialEntries={['/']}>
      <LoginPage />
    </MemoryRouter>,
    {
      preloadedState: loggedOutInitialState,
    }
  );

describe('Login Page', () => {
  it('should have title', () => {
    const { getByRole } = renderFunction();

    expect(getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  it('should have input fields and a login button', async () => {
    const { getByRole, getByLabelText } = renderFunction();

    const emailInput = getByLabelText('email-input');
    const passwordInput = getByLabelText('password-input');
    const Btn = getByRole('button', {
      name: /Login/,
    });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(Btn).toBeInTheDocument();
  });

  it('should send request for login', async () => {
    let call;
    server.events.on('request:start', ({ request }) => {
      request.method === 'POST' && request.url === 'http://localhost:3000/login'
        ? (call = 'POST login')
        : '';
    });

    const user = userEvent.setup();
    const { getByRole, getByLabelText } = renderFunction();

    const emailInput = getByLabelText('email-input');
    const passwordInput = getByLabelText('password-input');
    const Btn = getByRole('button', {
      name: /Login/,
    });

    await user.type(emailInput, 'roman.meszaros@nixs.com');
    await user.type(passwordInput, 'password');
    await user.click(Btn);

    await waitFor(() => {
      expect(call === 'POST login').toBe(true);
    });
  });

  it('after successfull login should navigate to HomePage', async () => {
    const navigate = vi.fn();
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);

    const user = userEvent.setup();
    const { store, getByRole, getByLabelText } = renderFunction();

    const emailInput = getByLabelText('email-input');
    const passwordInput = getByLabelText('password-input');
    const Btn = getByRole('button', {
      name: /Login/,
    });

    await user.type(emailInput, 'roman.meszaros@nixs.com');
    await user.type(passwordInput, 'password');
    await user.click(Btn);

    await waitFor(() => expect(store.getState().user.user.id === 1).toBe(true));
    expect(navigate).toHaveBeenCalledWith('/home');
  });

  it('should clear password input value if login rejected', async () => {
    server.use(http.post('/login', (res) => res.networkError()));

    const user = userEvent.setup();
    const { getByRole, getByLabelText } = renderFunction();

    const emailInput = getByLabelText('email-input');
    const passwordInput = getByLabelText('password-input');
    const Btn = getByRole('button', {
      name: /Login/,
    });

    await user.type(emailInput, 'roman.meszaros@nixs.com');
    await user.type(passwordInput, 'password');
    await user.click(Btn);

    await waitFor(() => expect(passwordInput.value === '').toBe(true));
  });
});
