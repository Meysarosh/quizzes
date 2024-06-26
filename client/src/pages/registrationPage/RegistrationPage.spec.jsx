import { waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders, initialState } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { RegistrationPage } from './RegistrationPage';
import { server } from '../../mocks/server';
import { MemoryRouter } from 'react-router-dom';
import { http } from 'msw';
import { act } from 'react-dom/test-utils';

const notRegisteredInitialState = {
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
    <MemoryRouter initialEntries={['/registration']}>
      <RegistrationPage />
    </MemoryRouter>,
    {
      preloadedState: notRegisteredInitialState,
    }
  );

describe('Registration Page', () => {
  it('should have title', () => {
    const { getByRole } = renderFunction();

    expect(getByRole('heading', { name: /registration/i })).toBeInTheDocument();
  });

  it('should have input fields and a login button', async () => {
    const { getByRole, getByLabelText } = renderFunction();

    const fullnameInput = getByLabelText('fullname-input');
    const emailInput = getByLabelText('email-input');
    const usernameInput = getByLabelText('username-input');
    const passwordInput = getByLabelText('password-input');
    const passwordConfirmInput = getByLabelText('passwordconfirm-input');
    const Btn = getByRole('button', {
      name: /Register/,
    });

    expect(fullnameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordConfirmInput).toBeInTheDocument();
    expect(Btn).toBeInTheDocument();
  });

  it('should send request for creating new user', async () => {
    let call;
    server.events.on('request:start', ({ request }) => {
      request.method === 'POST' && request.url === 'http://localhost:3000/users'
        ? (call = 'POST createNewUser')
        : '';
    });

    const user = userEvent.setup();
    const { getByRole, getByLabelText } = renderFunction();

    const fullnameInput = getByLabelText('fullname-input');
    const emailInput = getByLabelText('email-input');
    const usernameInput = getByLabelText('username-input');
    const passwordInput = getByLabelText('password-input');
    const passwordConfirmInput = getByLabelText('passwordconfirm-input');
    const Btn = getByRole('button', {
      name: /Register/,
    });

    await act(() => user.type(fullnameInput, 'New User'));
    await act(() => user.type(emailInput, 'test@vitest.com'));
    await act(() => user.type(usernameInput, 'Testuser'));
    await act(() => user.type(passwordInput, 'Password-1'));
    await act(() => user.type(passwordConfirmInput, 'Password-1'));
    await act(() => user.click(Btn));

    await waitFor(() => {
      expect(call === 'POST createNewUser').toBe(true);
    });
  });

  it('when request for creating new user is rejected should create error message', async () => {
    const user = userEvent.setup();
    const { store, getByRole, getByLabelText } = renderFunction();

    const fullnameInput = getByLabelText('fullname-input');
    const emailInput = getByLabelText('email-input');
    const usernameInput = getByLabelText('username-input');
    const passwordInput = getByLabelText('password-input');
    const passwordConfirmInput = getByLabelText('passwordconfirm-input');
    const Btn = getByRole('button', {
      name: /Register/,
    });

    await act(() => user.type(fullnameInput, 'New User'));
    await act(() => user.type(emailInput, 'test@vitest.com'));
    await act(() => user.type(usernameInput, 'Error'));
    await act(() => user.type(passwordInput, 'Password-1'));
    await act(() => user.type(passwordConfirmInput, 'Password-1'));
    await act(() => user.click(Btn));

    await vi.waitFor(() => expect(store.getState().user.error).toStrictEqual('An error occured!'));
  });

  it('network error on request for creating new user should create error message', async () => {
    server.use(http.post('/users', (res) => res.networkError()));
    const user = userEvent.setup();
    const { store, getByRole, getByLabelText } = renderFunction();

    const fullnameInput = getByLabelText('fullname-input');
    const emailInput = getByLabelText('email-input');
    const usernameInput = getByLabelText('username-input');
    const passwordInput = getByLabelText('password-input');
    const passwordConfirmInput = getByLabelText('passwordconfirm-input');
    const Btn = getByRole('button', {
      name: /Register/,
    });

    await act(() => user.type(fullnameInput, 'New User'));
    await act(() => user.type(emailInput, 'test@vitest.com'));
    await act(() => user.type(usernameInput, 'Testuser'));
    await act(() => user.type(passwordInput, 'Password-1'));
    await act(() => user.type(passwordConfirmInput, 'Password-1'));
    await act(() => user.click(Btn));

    await vi.waitFor(() => expect(store.getState().user.error).toStrictEqual('ERR_BAD_RESPONSE'));
  });

  it('full name should be required and have length between 7 and 30 chars', async () => {
    const user = userEvent.setup();
    const { findByText, getByRole, getByLabelText } = renderFunction();

    const fullnameInput = getByLabelText('fullname-input');
    const Btn = getByRole('button', {
      name: /Register/,
    });

    await act(() => user.click(Btn));
    const requiredError = await findByText('* Name is required');

    expect(requiredError).toBeInTheDocument();

    await act(() => user.type(fullnameInput, 'Short'));
    await act(() => user.click(Btn));
    const toShortError = await findByText('* Name must be at least 7 characters long');

    expect(toShortError).toBeInTheDocument();

    await act(() => user.type(fullnameInput, 'Long123456789123456789123456789'));
    await act(() => user.click(Btn));
    const toLongError = await findByText('* Name must not exceed 30 characters');

    expect(toLongError).toBeInTheDocument();
  });

  it('email required field', async () => {
    const user = userEvent.setup();
    const { findByText, getByRole } = renderFunction();

    const Btn = getByRole('button', {
      name: /Register/,
    });

    await act(() => user.click(Btn));
    const requiredError = await findByText('* Email is required');

    expect(requiredError).toBeInTheDocument();
  });

  it('username is required and should have length between 7 and 20 chars', async () => {
    const user = userEvent.setup();
    const { findByText, getByRole, getByLabelText } = renderFunction();
    const usernameInput = getByLabelText('username-input');
    const Btn = getByRole('button', {
      name: /Register/,
    });

    await act(() => user.click(Btn));
    const requiredError = await findByText('* Username is required');

    expect(requiredError).toBeInTheDocument();

    await act(() => user.type(usernameInput, 'abc'));
    await act(() => user.click(Btn));
    const shortError = await findByText('* Username must be at least 4 characters long');

    expect(shortError).toBeInTheDocument();

    await act(() => user.type(usernameInput, 'Long123456789123456789'));
    await act(() => user.click(Btn));
    const longError = await findByText('* Username must not exceed 20 character');

    expect(longError).toBeInTheDocument();
  });

  it('password required, should be at least 10 char long, should contain lowercase, uppercase letters, number and special chars', async () => {
    const user = userEvent.setup();
    const { findByText, getByRole, getByLabelText } = renderFunction();

    const passwordInput = getByLabelText('password-input');
    const Btn = getByRole('button', {
      name: /Register/,
    });

    await act(() => user.click(Btn));

    const requiredError = await findByText('* Password is required');

    expect(requiredError).toBeInTheDocument();

    await act(() => user.type(passwordInput, '123456789'));
    await act(() => user.click(Btn));

    const shortError = await findByText('* Password must be at least 10 character long');

    expect(shortError).toBeInTheDocument();

    await act(() => user.type(passwordInput, '1'));
    await act(() => user.click(Btn));

    const lowerError = await findByText('* Password must contain at least one lowercase letter');

    expect(lowerError).toBeInTheDocument();

    await act(() => user.type(passwordInput, 'a'));
    await act(() => user.click(Btn));

    const upperError = await findByText('* Password must contain at least one uppercase letter');

    expect(upperError).toBeInTheDocument();

    await act(() => user.type(passwordInput, 'A'));
    await act(() => user.click(Btn));

    const specError = await findByText('* Password must contain at least one special character');

    expect(specError).toBeInTheDocument();

    await act(() => user.clear(passwordInput));
    await act(() => user.type(passwordInput, 'Abcdefghij*'));
    await act(() => user.click(Btn));

    const numberError = await findByText('* Password must contain at least one number');

    expect(numberError).toBeInTheDocument();
  });

  it('confirmation password must match the password', async () => {
    const user = userEvent.setup();
    const { findByText, getByRole, getByLabelText } = renderFunction();

    const passwordInput = getByLabelText('password-input');
    const passwordConfirmInput = getByLabelText('passwordconfirm-input');
    const Btn = getByRole('button', {
      name: /Register/,
    });

    await act(() => user.type(passwordInput, 'Password-1'));
    await act(() => user.type(passwordConfirmInput, 'Password'));
    await act(() => user.click(Btn));

    const matchError = await findByText('* Passwords must match');
    expect(matchError).toBeInTheDocument();
  });
});
