import { describe, expect, it } from 'vitest';
import { waitFor } from '@testing-library/react';
import { renderWithProviders, initialState } from '../../utils/test-utils';
import { ProfilePage } from './ProfilePage';
import { MemoryRouter } from 'react-router-dom';
import { server } from '../../mocks/server';
import userEvent from '@testing-library/user-event';
import * as reactRouter from 'react-router';
import { act } from 'react-dom/test-utils';
import { http } from 'msw';

const initialStateWithoutUserData = {
  ...initialState,
  user: {
    ...initialState.user,
    user: {
      ...initialState.user.user,
      email: '',
      fullname: '',
      username: '',
      dateofbirth: '2024-03-18',
    },
  },
  userQuizzes: {
    quizzes: [
      {
        quizId: 1,
        date: 1716394823097,
        quizBank: 'React',
        topic: 'React Router',
        questionsQuantity: 6,
        correctAnswersQuantity: 4,
        isFinished: false,
      },
      {
        quizId: 3,
        date: 1716448340169,
        quizBank: 'TypeScript',
        topic: 'TypeScript',
        questionsQuantity: 71,
        correctAnswersQuantity: 1,
        isFinished: false,
      },
      {
        quizId: 4,
        date: 1716468178253,
        quizBank: 'React',
        topic: 'React Basics',
        questionsQuantity: 2,
        correctAnswersQuantity: 1,
        isFinished: true,
      },
    ],
  },
};

const quizCopiedState = {
  ...initialState,
  quiz: {
    quiz: {
      userId: 1,
      isFinished: false,
      filters: {
        quizBank: 'React',
        topic: 'React Components',
        difficulty: [],
        quantity: 6,
        isCorrectlyAnswered: true,
        isIncorrectlyAnswered: true,
        isUnanswered: true,
      },
      questions: [1],
      submittedAnswers: [],
      correctAnswers: [],
    },
    currentQuestion: null,
    selectedOptions: [],
  },
};

const renderFunction = () =>
  renderWithProviders(
    <MemoryRouter initialEntries={['/profile']}>
      <ProfilePage />
    </MemoryRouter>,
    {
      preloadedState: initialState,
    }
  );

describe('Profile page', () => {
  it('Profile page should have heading', () => {
    const { getAllByRole } = renderFunction();

    const heading = getAllByRole('heading')[0];
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Profile/i);
  });
});

describe('Profile form', () => {
  it('Profile form should have profile img', () => {
    const { getByRole } = renderFunction();
    const profileImg = getByRole('img');

    expect(profileImg).toBeInTheDocument();
  });

  it('After submitting changes, should request an update', async () => {
    const { getByRole, getByLabelText } = renderFunction();
    const user = userEvent.setup();

    let call;
    server.events.on('request:start', ({ request }) => {
      request.method === 'PUT' && request.url === 'http://localhost:3000/users/1'
        ? (call = 'PUT updateUserData')
        : '';
    });

    const passwordInput = getByLabelText('password-input');
    const passwordConfirmInput = getByLabelText('passwordconfirm-input');
    const Btn = getByRole('button', {
      name: /Submit/,
    });

    expect(passwordInput).toBeInTheDocument();
    expect(passwordConfirmInput).toBeInTheDocument();
    expect(Btn).toBeInTheDocument();

    await user.type(passwordInput, 'Password-1');
    await user.type(passwordConfirmInput, 'Password-1');
    await user.click(Btn);

    await waitFor(() => {
      expect(call === 'PUT updateUserData').toBe(true);
    });
  });

  it('Wrong password should produce an error message', async () => {
    const { store, getByRole, getByLabelText } = renderFunction();
    const user = userEvent.setup();

    const passwordInput = getByLabelText('password-input');
    const passwordConfirmInput = getByLabelText('passwordconfirm-input');
    const Btn = getByRole('button', {
      name: /Submit/,
    });

    await user.type(passwordInput, 'Wrongpassword-400');
    await user.type(passwordConfirmInput, 'Wrongpassword-400');
    await user.click(Btn);

    await vi.waitFor(() => expect(store.getState().user.error).toStrictEqual('incorrect password'));
  });

  it('Network error should produce an error message', async () => {
    server.use(http.put('/users/1', (res) => res.networkError()));
    const { store, getByRole, getByLabelText } = renderFunction();
    const user = userEvent.setup();
    const passwordInput = getByLabelText('password-input');
    const passwordConfirmInput = getByLabelText('passwordconfirm-input');
    const Btn = getByRole('button', {
      name: /Submit/,
    });

    await user.type(passwordInput, 'Password-1');
    await user.type(passwordConfirmInput, 'Password-1');
    await user.click(Btn);

    await vi.waitFor(() => expect(store.getState().user.error).toStrictEqual('ERR_BAD_RESPONSE'));
  });

  it('Upload new image should work', async () => {
    const { getByTestId } = renderFunction();
    const testImg = new File(['test'], 'test.jpg', { type: 'image/img' });
    const user = userEvent.setup();

    const inputFile = getByTestId('fileUpload');
    expect(inputFile).toBeInTheDocument();

    await user.upload(inputFile, testImg);

    expect(inputFile.files[0]).toStrictEqual(testImg);
  });

  it('Clicking on plus button on avatar should initiate file upload', async () => {
    const { getByTestId } = renderFunction();
    const user = userEvent.setup();
    const onClickSpy = vi.spyOn(HTMLInputElement.prototype, 'click');

    const plusButton = getByTestId('PlusButton');
    expect(plusButton).toBeInTheDocument();

    await user.click(plusButton);

    expect(onClickSpy).toHaveBeenCalled();
  });

  it('Should check input fields and display error messages', async () => {
    const { getByLabelText, getByRole, findByText } = renderWithProviders(
      <MemoryRouter initialEntries={['/profile']}>
        <ProfilePage />
      </MemoryRouter>,
      {
        preloadedState: initialStateWithoutUserData,
      }
    );
    const user = userEvent.setup();

    const passwordInput = getByLabelText('password-input');
    const Btn = getByRole('button', {
      name: /Submit/,
    });

    await user.click(Btn);

    const fullnameError = await findByText('* Name is required');
    const emailError = await findByText('* Email is required');
    const usernameError = await findByText('* Username is required');
    const passwordError = await findByText('* Password is required');

    expect(fullnameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    expect(usernameError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();

    await user.type(passwordInput, 'a');
    await user.click(Btn);

    const passwordConfirmError = await findByText('* Passwords must match');

    expect(passwordConfirmError).toBeInTheDocument();
  });

  it('if bith date is set, it should be displayed', () => {
    const { getByLabelText } = renderWithProviders(
      <MemoryRouter initialEntries={['/profile']}>
        <ProfilePage />
      </MemoryRouter>,
      {
        preloadedState: initialStateWithoutUserData,
      }
    );

    const date = getByLabelText('date of birth');
    expect(date).toHaveValue('2024-03-18');
  });
});

describe('QuizzesTable', () => {
  it('should request user quizzes', async () => {
    let call;
    server.events.on('request:start', ({ request }) => {
      request.method === 'GET' && request.url === 'http://localhost:3000/quizzes?userId=1'
        ? (call = 'GET quizzes')
        : '';
    });

    renderWithProviders(
      <MemoryRouter initialEntries={['/profile']}>
        <ProfilePage />
      </MemoryRouter>,
      {
        preloadedState: { ...initialState, user: { ...initialState.user, history: ['/profile'] } },
      }
    );

    await waitFor(() => expect(call === 'GET quizzes').toBe(true));
  });

  it('should create na error message if request is rejected', async () => {
    const { store } = renderWithProviders(
      <MemoryRouter initialEntries={['/profile']}>
        <ProfilePage />
      </MemoryRouter>,
      {
        preloadedState: {
          ...initialState,
          user: {
            ...initialState.user,
            user: { ...initialState.user.user, id: 2 },
            history: ['/profile'],
          },
        },
      }
    );

    await act(
      async () =>
        await vi.waitFor(() =>
          expect(store.getState().user.error).toStrictEqual('An error occured!')
        )
    );
  });

  it('should create an error message on network error', async () => {
    server.use(http.get('/quizzes', (res) => res.networkError()));

    const { store } = renderWithProviders(
      <MemoryRouter initialEntries={['/profile']}>
        <ProfilePage />
      </MemoryRouter>,
      {
        preloadedState: {
          ...initialState,
          user: {
            ...initialState.user,
            user: { ...initialState.user.user, id: 2 },
            history: ['/profile'],
          },
        },
      }
    );

    await act(
      async () =>
        await vi.waitFor(() =>
          expect(store.getState().user.error).toStrictEqual('ERR_BAD_RESPONSE')
        )
    );
  });

  it('Should display data about user quizzes', () => {
    const { getByText, getByRole, getAllByText, getAllByRole } = renderWithProviders(
      <MemoryRouter initialEntries={['/profile']}>
        <ProfilePage />
      </MemoryRouter>,
      {
        preloadedState: initialStateWithoutUserData,
      }
    );
    const progress0 = getByText('4/6');

    const topic1 = getByText('TypeScript - TypeScript');
    const progress1 = getByText('1/71');
    const status1 = getAllByText('Unfinished')[1];
    const btn1 = getAllByRole('button', { name: /Resume/i })[1];

    const topic2 = getByText('React - React Basics');
    const progress2 = getByText('1/2');
    const status2 = getByText('Finished');
    const btn2 = getByRole('button', { name: /Retake/i });
    const btn3 = getByRole('button', { name: /Summary/i });

    expect(progress0).toHaveClass('green');
    expect(progress1).toHaveClass('red');

    expect(topic1).toBeInTheDocument();
    expect(progress1).toBeInTheDocument();
    expect(status1).toBeInTheDocument();
    expect(btn1).toBeInTheDocument();

    expect(topic2).toBeInTheDocument();
    expect(progress2).toBeInTheDocument();
    expect(status2).toBeInTheDocument();
    expect(btn2).toBeInTheDocument();
    expect(btn3).toBeInTheDocument();
  });

  it('Should navigate to summary page when summary button clicked', async () => {
    const navigate = vi.fn();
    vi.spyOn(reactRouter, 'useNavigate').mockImplementation(() => navigate);

    const user = userEvent.setup();
    const { getByRole } = renderWithProviders(
      <MemoryRouter initialEntries={['/profile']}>
        <ProfilePage />
      </MemoryRouter>,
      {
        preloadedState: initialStateWithoutUserData,
      }
    );

    const btn3 = getByRole('button', { name: /Summary/i });

    await user.click(btn3);

    expect(navigate).toHaveBeenCalledWith('/summary/4');
  });

  it('Should request quiz by id when retake button clicked', async () => {
    const user = userEvent.setup();
    const { getByRole } = renderWithProviders(
      <MemoryRouter initialEntries={['/profile']}>
        <ProfilePage />
      </MemoryRouter>,
      {
        preloadedState: initialStateWithoutUserData,
      }
    );

    let call;
    server.events.on('request:start', ({ request }) => {
      request.method === 'GET' && request.url === 'http://localhost:3000/quizzes?id=4'
        ? (call = 'GET quiz')
        : '';
    });

    const btn2 = getByRole('button', { name: /Retake/i });
    await user.click(btn2);

    await waitFor(() => expect(call === 'GET quiz').toBe(true));
  });

  it('Should request for creating new quiz', async () => {
    let call;
    server.events.on('request:start', ({ request }) => {
      request.method === 'POST' && request.url === 'http://localhost:3000/quizzes'
        ? (call = 'POST quiz')
        : '';
    });

    renderWithProviders(
      <MemoryRouter initialEntries={['/profile']}>
        <ProfilePage />
      </MemoryRouter>,
      {
        preloadedState: quizCopiedState,
      }
    );

    await waitFor(() => expect(call === 'POST quiz').toBe(true));
  });
});
