import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders, initialState } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { Header } from './Header';
import { MemoryRouter } from 'react-router-dom';
import * as reactRouter from 'react-router';
import { act } from 'react-dom/test-utils';

const notFinishedQuizState = {
  ...initialState,
  user: { ...initialState.user, history: ['/home', '/quiz/1', '/home'] },
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
      questions: [2],
      submittedAnswers: [],
      correctAnswers: [1],
      date: 1715086788306,
      id: 1,
    },
    currentQuestion: null,
    selectedOptions: [],
  },
};

const finishedQuizStateAfterSummary = {
  ...initialState,
  user: { ...initialState.user, history: ['/home', '/quiz/1', '/summary/1', '/home'] },
  quiz: {
    quiz: {
      userId: 1,
      isFinished: true,
      filters: {
        quizBank: 'React',
        topic: 'React Components',
        difficulty: [],
        quantity: 6,
        isCorrectlyAnswered: true,
        isIncorrectlyAnswered: true,
        isUnanswered: true,
      },
      questions: [2],
      submittedAnswers: [],
      correctAnswers: [1],
      date: 1715086788306,
      id: 1,
    },
    currentQuestion: null,
    selectedOptions: [],
  },
};

const stateWithSummary = {
  ...initialState,
  user: { ...initialState.user, history: ['/home', '/quiz/1', '/summary/1', '/home'] },
  summary: {
    questions: [
      {
        id: 1,
        topic: 'React Basics',
        level: 'Beginner',
        question: 'What is React?',
        answers: {
          1: {
            text: 'A JavaScript library for building user interfaces',
            correct: true,
          },
          2: {
            text: 'A programming language',
          },
          3: {
            text: 'A database management system',
          },
        },
        correct_answer: 1,
      },
      {
        id: 49,
        topic: 'React Basics',
        level: 'Easy',
        question: 'What is React?',
        answers: {
          1: {
            text: 'React is a JavaScript library for building user interfaces.',
            correct: true,
          },
          2: {
            text: 'React is a programming language.',
          },
          3: {
            text: 'React is a server-side rendering framework.',
          },
        },
        correct_answer: 1,
      },
    ],
    correctlyAnsweredQid: [1, 49],
    incorrectlyAnsweredQid: [],
  },
};

const inititalQuizState = {
  userId: null,
  isFinished: false,
  filters: {
    quizBank: null,
    topic: null,
    difficulty: [],
    quantity: null,
  },
  questions: [],
  submittedAnswers: [],
  correctAnswers: [],
  date: null,
};

const inititalSummaryState = {
  questions: [],
  correctlyAnsweredQid: [],
  incorrectlyAnsweredQid: [],
  unansweredQid: [],
  partialyAnsweredQ: [],
};

const history = [
  '/home',
  '/quiz/1',
  '/home',
  '/quiz/2',
  '/home',
  '/quiz/3',
  '/home',
  '/quiz/4',
  '/home',
  '/quiz/5',
  '/home',
];

const stateWithHistory = {
  ...initialState,
  user: { ...initialState.user, history },
};

const renderFunction = () =>
  renderWithProviders(
    <MemoryRouter initialEntries={['/home']}>
      <Header />
    </MemoryRouter>,
    {
      preloadedState: initialState,
    }
  );

describe('Header', () => {
  it('should render header with logo and avatar', () => {
    const { getByRole } = renderFunction();
    const header = getByRole('banner');
    const logo = header.firstChild;
    const profile = header.lastChild;

    expect(logo).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
  });

  it('should navigate to profile page when click on avatar', async () => {
    const user = userEvent.setup();

    const navigate = vi.fn();
    vi.spyOn(reactRouter, 'useNavigate').mockImplementation(() => navigate);

    const { getByRole } = renderFunction();
    const header = getByRole('banner');

    const profile = header.lastChild.lastChild;

    await user.click(profile);

    expect(navigate).toHaveBeenCalledWith('/profile');
  });

  it('should logout when click logout button', async () => {
    const user = userEvent.setup();

    const { store, getByRole } = renderFunction();
    const header = getByRole('banner');

    const logoutBtn = header.lastChild.firstChild;

    await act(() => user.click(logoutBtn));

    await vi.waitFor(() => expect(store.getState().token.token).toBe(null));
    await vi.waitFor(() => expect(store.getState().token.refreshToken).toBe(null));
  });

  it('should navigate to home page if when click on logo', async () => {
    const user = userEvent.setup();

    const navigate = vi.fn();
    vi.spyOn(reactRouter, 'useNavigate').mockImplementation(() => navigate);

    const { getByRole } = renderFunction();
    const header = getByRole('banner');

    const logo = header.firstChild;

    await user.click(logo);

    expect(navigate).toHaveBeenCalledWith('/home');
  });

  it('should store history not longr then 10', async () => {
    const { store } = renderWithProviders(
      <MemoryRouter initialEntries={['/home']}>
        <Header />
      </MemoryRouter>,
      {
        preloadedState: stateWithHistory,
      }
    );

    const shiftedHistory = [...history];
    shiftedHistory.shift();

    await vi.waitFor(() => expect(store.getState().user.history).toStrictEqual(shiftedHistory));
  });

  it('should display user image if it is set', () => {
    const { store, getByRole } = renderFunction();
    const img = getByRole('img');
    expect(
      img.src === `http://localhost:3000/src/assets/img/${store.getState().user.user.img}`
    ).toBe(true);
  });

  it('should set quiz state to its initial state when leave quiz page', async () => {
    const { store } = renderWithProviders(
      <MemoryRouter initialEntries={['/home']}>
        <Header />
      </MemoryRouter>,
      {
        preloadedState: notFinishedQuizState,
      }
    );

    expect(store.getState().quiz.quiz).toStrictEqual(inititalQuizState);
  });

  it('should change state highlight.isHighligh when clicked on highlight switch', async () => {
    const user = userEvent.setup();
    const { store, getByText } = renderWithProviders(
      <MemoryRouter initialEntries={['/summary']}>
        <Header />
      </MemoryRouter>,
      {
        preloadedState: stateWithSummary,
      }
    );

    const switchBtn = getByText('highlight off');
    expect(switchBtn).toBeInTheDocument();

    expect(store.getState().highlight.highlight.isHighlight === false).toBe(true);

    await act(async () => await user.click(switchBtn));

    await waitFor(() =>
      expect(store.getState().highlight.highlight.isHighlight === true).toBe(true)
    );
  });

  it('should change theme when click on theme switch', async () => {
    const user = userEvent.setup();
    const { container, store } = renderWithProviders(
      <MemoryRouter initialEntries={['/summary']}>
        <Header />
      </MemoryRouter>,
      {
        preloadedState: stateWithSummary,
      }
    );

    const switchBtn = container.getElementsByClassName('theme_switch')[0];

    expect(store.getState().user.darkMode === false).toBe(true);

    await act(async () => await user.click(switchBtn));

    await waitFor(() => expect(store.getState().user.darkMode === true).toBe(true));
  });

  it('should set quiz state to its initial state when leave summary page', async () => {
    const { store } = renderWithProviders(
      <MemoryRouter initialEntries={['/home']}>
        <Header />
      </MemoryRouter>,
      {
        preloadedState: finishedQuizStateAfterSummary,
      }
    );

    expect(store.getState().quiz.quiz).toStrictEqual(inititalQuizState);
  });

  it('should reset summary state after summary page was left', async () => {
    const { store } = renderWithProviders(
      <MemoryRouter initialEntries={['/home']}>
        <Header />
      </MemoryRouter>,
      {
        preloadedState: stateWithSummary,
      }
    );

    await waitFor(() => expect(store.getState().summary).toStrictEqual(inititalSummaryState));
  });
});
