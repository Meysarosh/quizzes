import { waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders, initialState } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { server } from '../../mocks/server';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { QuizPage } from './QuizPage';

const initialStateQuizById = {
  ...initialState,
  user: {
    ...initialState.user,
    history: ['/home', '/quiz/13'],
  },
};

const initialStateForQuizPage = {
  ...initialState,
  quiz: {
    quiz: {
      userId: 1,
      isFinished: false,
      filters: {
        quizBank: 'React',
        topic: 'React Basics',
        difficulty: [],
        quantity: 2,
        isCorrectlyAnswered: true,
        isIncorrectlyAnswered: true,
        isUnanswered: true,
        multiAnswer: 'all',
      },
      questions: [1],
      submittedAnswers: [],
      correctAnswers: [1],
      date: 1716558957755,
      id: 13,
    },
    currentQuestion: {
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
    selectedOptions: [],
  },
};

const router = createMemoryRouter([{ path: '/quiz/:id', element: <QuizPage /> }], {
  initialEntries: ['/', '/quiz/13'],
  initialIndex: 1,
});

const renderFunction = () =>
  renderWithProviders(<RouterProvider router={router} />, {
    preloadedState: initialStateForQuizPage,
  });

describe('Quiz Page', () => {
  it('Should have heading equal to topic name', () => {
    const { getByRole } = renderFunction();

    const heading = getByRole('heading');
    expect(heading).toHaveTextContent(initialStateForQuizPage.quiz.currentQuestion.topic);
  });

  it('Should display question and answers text', () => {
    const { getByText } = renderFunction();

    const questionText = getByText(initialStateForQuizPage.quiz.currentQuestion.question);
    const answer1Text = getByText('A JavaScript library for building user interfaces');
    const answer2Text = getByText('A programming language');
    const answer3Text = getByText('A database management system');

    expect(questionText).toBeInTheDocument();
    expect(answer1Text).toBeInTheDocument();
    expect(answer2Text).toBeInTheDocument();
    expect(answer3Text).toBeInTheDocument();
  });

  it('should set selected option when user clicks on an answer', async () => {
    const { store, getByText } = renderFunction();
    const user = userEvent.setup();

    const answer1Text = getByText('A JavaScript library for building user interfaces');

    await user.click(answer1Text);

    await waitFor(() => expect(store.getState().quiz.selectedOptions[0]).toBe(1));
  });

  it('should request next question after clicking on submit button after selected some answer', async () => {
    let call;
    server.events.on('request:start', ({ request }) => {
      request.method === 'GET' &&
      request.url === 'http://localhost:4000/React?topic=React%20Basics&id_ne=1'
        ? (call = 'GET next question')
        : '';
    });
    const { getByText, getByRole } = renderFunction();
    const user = userEvent.setup();

    const answer1Text = getByText('A JavaScript library for building user interfaces');
    const submitBtn = getByRole('button', { name: /Submit/ });

    await user.click(answer1Text);
    await user.click(submitBtn);

    await waitFor(() => expect(call === 'GET next question').toBe(true));
  });

  it('should request next question after clicking on skip button', async () => {
    let call;
    server.events.on('request:start', ({ request }) => {
      request.method === 'GET' &&
      request.url === 'http://localhost:4000/React?topic=React%20Basics&id_ne=1'
        ? (call = 'GET next question')
        : '';
    });
    const { getByRole } = renderFunction();
    const user = userEvent.setup();

    const submitBtn = getByRole('button', { name: /Skip/ });

    await user.click(submitBtn);

    await waitFor(() => expect(call === 'GET next question').toBe(true));
  });

  it('should request next question after clicking on arrow right', async () => {
    let call;
    server.events.on('request:start', ({ request }) => {
      request.method === 'GET' &&
      request.url === 'http://localhost:4000/React?topic=React%20Basics&id_ne=1'
        ? (call = 'GET next question')
        : '';
    });
    const { getByText, findByText } = renderFunction();
    const user = userEvent.setup();

    const arrowRight = getByText('React Basics').nextSibling.lastChild;
    const arrowLeft = getByText('React Basics').nextSibling.firstChild;
    const answer = getByText('A programming language');

    expect(answer).toBeInTheDocument();

    await user.click(arrowRight);

    await waitFor(() => expect(call === 'GET next question').toBe(true));

    expect(answer).not.toBeInTheDocument();

    const answer2 = await findByText('React is a programming language.');
    expect(answer2).toBeInTheDocument();

    await user.click(arrowLeft);
    expect(answer2).not.toBeInTheDocument();
  });

  it('clicking on discard button should render modal window', async () => {
    const { getByRole, findByText } = renderFunction();
    const user = userEvent.setup();

    const discardBtn = getByRole('button', { name: /Discard/ });

    await user.click(discardBtn);

    const modal = await findByText('Do you want to discard?');

    expect(modal).toBeInTheDocument();
  });

  it('should request quiz by id from url', async () => {
    let call;
    server.events.on('request:start', ({ request }) => {
      request.method === 'GET' && request.url === 'http://localhost:3000/quizzes?id=13'
        ? (call = 'GET quiz by id')
        : '';
    });

    renderWithProviders(<RouterProvider router={router} />, {
      preloadedState: initialStateQuizById,
    });

    await waitFor(() => expect(call === 'GET quiz by id').toBe(true));
  });
});
