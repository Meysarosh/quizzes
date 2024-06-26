import { waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders, initialState } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { server } from '../../mocks/server';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { QuizPage } from './QuizPage';
import { HomePage } from '../homePage/HomePage';
import { act } from 'react-dom/test-utils';
import { http } from 'msw';

const initialStateQuizById = {
  ...initialState,
  user: {
    ...initialState.user,
    history: ['/home', '/quiz/13'],
  },
};

const initialStateQuizByIdError = {
  ...initialState,
  user: {
    ...initialState.user,
    history: ['/home', '/quiz/14'],
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
        multiAnswer: 'single',
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

const initialStateNewQuiz = {
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
        isCorrectlyAnswered: false,
        isIncorrectlyAnswered: false,
        isUnanswered: true,
        multiAnswer: 'multi',
      },
      questions: [],
      submittedAnswers: [],
      correctAnswers: [],
      date: 1716558957755,
      id: 1,
    },
    currentQuestion: null,
    selectedOptions: [],
  },
  user: {
    ...initialState.user,
    history: ['/home', '/quiz/1'],
  },
};

const initialStateNewQuestionReject = {
  quiz: {
    quiz: {
      userId: 1,
      isFinished: false,
      filters: {
        quizBank: 'CSS',
        topic: 'CSS',
        difficulty: [],
        quantity: 2,
        isCorrectlyAnswered: true,
        isIncorrectlyAnswered: true,
        isUnanswered: true,
        multiAnswer: 'all',
      },
      questions: [],
      submittedAnswers: [],
      correctAnswers: [],
      date: 1716558957755,
      id: 1,
    },
    currentQuestion: null,
    selectedOptions: [],
  },
  user: {
    ...initialState.user,
    history: ['/home', '/quiz/1'],
  },
};

const initialStateForHTMLQuiz = {
  ...initialState,
  quiz: {
    quiz: {
      userId: 1,
      isFinished: false,
      filters: {
        quizBank: 'HTML',
        topic: 'HTML',
        difficulty: ['Easy', 'Medium', 'Hard'],
        quantity: 40,
        isCorrectlyAnswered: true,
        isIncorrectlyAnswered: true,
        isUnanswered: true,
        multiAnswer: 'all',
      },
      questions: [77],
      submittedAnswers: [],
      correctAnswers: [1],
      date: 1716973831640,
      id: 1,
    },
    currentQuestion: {
      id: 77,
      topic: 'HTML',
      level: 'Easy',
      question: 'What does HTML stand for?',
      answers: {
        1: {
          text: 'Hypertext Markup Language',
          correct: true,
        },
        2: {
          text: 'Hyperlink and Text Markup Language',
        },
        3: {
          text: 'High Text Markup Language',
        },
      },
      correct_answer: 1,
    },
    selectedOptions: [],
  },
};

const initialStateForProducingError = {
  ...initialStateForQuizPage,
  quiz: {
    ...initialStateForQuizPage.quiz,
    quiz: {
      ...initialStateForQuizPage.quiz.quiz,
      filters: {
        ...initialStateForQuizPage.quiz.quiz.filters,
        quantity: 3,
      },
    },
  },
};

const router = createMemoryRouter([{ path: '/quiz/:id', element: <QuizPage /> }], {
  initialEntries: ['/', '/quiz/13'],
  initialIndex: 1,
});

const router2 = createMemoryRouter(
  [
    { path: '/quiz/:id', element: <QuizPage /> },
    { path: '/home', element: <HomePage /> },
  ],
  {
    initialEntries: ['/', '/quiz/1'],
    initialIndex: 1,
  }
);

const router3 = createMemoryRouter([{ path: '/quiz/:id', element: <QuizPage /> }], {
  initialEntries: ['/', '/quiz/14'],
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

    await act(() => user.click(answer1Text));

    await waitFor(() => expect(store.getState().quiz.selectedOptions[0]).toBe(1));
  });

  it('should request next question after clicking on submit button after selected some answer', async () => {
    let call;
    server.events.on('request:start', ({ request }) => {
      request.method === 'GET' &&
      request.url ===
        'http://localhost:4000/React?topic=React%20Basics&correct_answer=1&correct_answer=2&correct_answer=3&id_ne=1&_limit=1'
        ? (call = 'GET next question')
        : '';
    });
    const { getByText, getByRole, store } = renderFunction();
    const user = userEvent.setup();

    const answer1Text = getByText('A JavaScript library for building user interfaces');
    const submitBtn = getByRole('button', { name: /Submit/ });

    await act(() => user.click(submitBtn));

    vi.waitFor(() =>
      expect(store.getState().user.error).toStrictEqual('Select an answer before proceed!')
    );

    await act(() => user.click(answer1Text));
    await act(() => user.click(submitBtn));

    await waitFor(() => expect(call === 'GET next question').toBe(true));
  });

  it('should request next question after clicking on skip button', async () => {
    let call;
    server.events.on('request:start', ({ request }) => {
      request.method === 'GET' &&
      request.url ===
        'http://localhost:4000/React?topic=React%20Basics&correct_answer=1&correct_answer=2&correct_answer=3&id_ne=1&_limit=1'
        ? (call = 'GET next question')
        : '';
    });
    const { getByRole } = renderFunction();
    const user = userEvent.setup();

    const submitBtn = getByRole('button', { name: /Skip/ });

    await act(() => user.click(submitBtn));

    await waitFor(() => expect(call === 'GET next question').toBe(true));
  });

  it('should request next question after clicking on arrow right', async () => {
    let call;
    server.events.on('request:start', ({ request }) => {
      request.method === 'GET' &&
      request.url ===
        'http://localhost:4000/React?topic=React%20Basics&correct_answer=1&correct_answer=2&correct_answer=3&id_ne=1&_limit=1'
        ? (call = 'GET next question')
        : '';
    });
    const { getByText, findByText } = renderFunction();
    const user = userEvent.setup();

    const arrowRight = getByText('React Basics').nextSibling.lastChild;
    const arrowLeft = getByText('React Basics').nextSibling.firstChild;
    const answer = getByText('A programming language');

    expect(answer).toBeInTheDocument();

    await act(() => user.click(arrowRight));

    await waitFor(() => expect(call === 'GET next question').toBe(true));

    expect(answer).not.toBeInTheDocument();

    const answer2 = await findByText('React is a programming language.');
    expect(answer2).toBeInTheDocument();

    await act(() => user.click(arrowLeft));
    expect(answer2).not.toBeInTheDocument();
  });

  it('rejected request for new question creates error message', async () => {
    const { store, getByText } = renderWithProviders(<RouterProvider router={router} />, {
      preloadedState: initialStateForProducingError,
    });

    const user = userEvent.setup();

    const arrowRight = getByText('React Basics').nextSibling.lastChild;

    await act(() => user.click(arrowRight));
    await act(() => user.click(arrowRight));

    await vi.waitFor(() => expect(store.getState().user.error).toStrictEqual('An error occured!'));
  });

  it('network error on quiz request creaes error message', async () => {
    server.use(http.get('/quizzes', (res) => res.networkError()));

    const { store } = renderWithProviders(<RouterProvider router={router} />, {
      preloadedState: initialStateQuizById,
    });

    await act(
      async () =>
        await vi.waitFor(() =>
          expect(store.getState().user.error).toStrictEqual('ERR_BAD_RESPONSE')
        )
    );
  });

  it('clicking on discard button should render modal window', async () => {
    const { getByRole, findByText } = renderFunction();
    const user = userEvent.setup();

    const discardBtn = getByRole('button', { name: /Discard/ });

    await act(() => user.click(discardBtn));

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

  it('if request quiz by id rejected should produce error', async () => {
    const { store } = renderWithProviders(<RouterProvider router={router3} />, {
      preloadedState: initialStateQuizByIdError,
    });

    await act(
      async () =>
        await vi.waitFor(() =>
          expect(store.getState().user.error).toStrictEqual('An error occured!')
        )
    );
  });

  it('should request first question when opening existing quiz', async () => {
    let call;
    server.events.on('request:start', ({ request }) => {
      request.method === 'GET' && request.url === 'http://localhost:4000/React?id=2'
        ? (call = 'GET question by id')
        : '';
    });

    renderWithProviders(<RouterProvider router={router} />, {
      preloadedState: initialStateQuizById,
    });

    await waitFor(() => expect(call === 'GET question by id').toBe(true));
  });

  it('network error on question request creates error message', async () => {
    const { store } = renderWithProviders(<RouterProvider router={router2} />, {
      preloadedState: initialStateNewQuestionReject,
    });

    await act(() =>
      vi.waitFor(() => expect(store.getState().user.error).toStrictEqual('ERR_BAD_RESPONSE'))
    );
  });

  it('should request a question when the quiz is just created', async () => {
    let call;
    server.events.on('request:start', ({ request }) => {
      request.method === 'GET' &&
      request.url ===
        'http://localhost:4000/React?topic=React%20Basics&isMulti=true&id_ne=1&id_ne=2&_limit=1'
        ? (call = 'GET question by filters')
        : '';
    });

    renderWithProviders(<RouterProvider router={router2} />, {
      preloadedState: initialStateNewQuiz,
    });

    await waitFor(() => expect(call === 'GET question by filters').toBe(true));
  });

  it('should allow multi answers for multi-answer question', async () => {
    const user = userEvent.setup();
    const { store, findByText } = renderWithProviders(<RouterProvider router={router2} />, {
      preloadedState: initialStateNewQuiz,
    });

    const answer1 = await findByText('It returns an array with two elements');
    const answer2 = await findByText('The first element is the current state');

    expect(answer1).toBeInTheDocument();
    expect(answer2).toBeInTheDocument();

    await act(() => user.click(answer1));
    await act(() => user.click(answer2));

    await waitFor(() => expect(store.getState().quiz.selectedOptions[0]).toStrictEqual([1, 2]));

    await act(() => user.click(answer2));

    await waitFor(() => expect(store.getState().quiz.selectedOptions[0]).toStrictEqual([1]));
  });

  it('clicking cancel on rendered modal window should reset blocker', async () => {
    const user = userEvent.setup();

    const { findByText, findByRole } = renderWithProviders(<RouterProvider router={router2} />, {
      preloadedState: initialStateNewQuiz,
    });

    const answer1 = await findByText('It returns an array with two elements');
    const answer2 = await findByText('The first element is the current state');

    expect(answer1).toBeInTheDocument();
    expect(answer2).toBeInTheDocument();

    const discardBtn = await findByRole('button', { name: /Discard/ });
    await act(() => user.click(discardBtn));

    const cancelBtn = await findByRole('button', { name: /Cancel/ });
    await act(() => user.click(cancelBtn));

    expect(cancelBtn).not.toBeInTheDocument();
  });

  it('creates and updates answeredQuestion object for user', async () => {
    const user = userEvent.setup();

    const { findByText, findByRole } = renderWithProviders(<RouterProvider router={router2} />, {
      preloadedState: initialStateForHTMLQuiz,
    });

    const answer1 = await findByText('Hypertext Markup Language');

    await act(() => user.click(answer1));

    const submitBtn = await findByRole('button', { name: /Submit/ });
    await act(() => user.click(submitBtn));

    const answer2 = await findByText('To group and style content.');
    expect(answer2).toBeInTheDocument();
    await act(() => user.click(answer2));
  });

  it('clicking discard on rendered modal window should navigate to home page', async () => {
    const user = userEvent.setup();

    const { findByText, findByRole } = renderWithProviders(<RouterProvider router={router2} />, {
      preloadedState: initialStateNewQuiz,
    });

    const answer1 = await findByText('It returns an array with two elements');
    const answer2 = await findByText('The first element is the current state');

    expect(answer1).toBeInTheDocument();
    expect(answer2).toBeInTheDocument();

    const discardBtn = await findByRole('button', { name: /Discard/ });

    await user.click(discardBtn);

    const discardBtn2 = (await findByRole('button', { name: /Cancel/ })).nextSibling;
    expect(discardBtn2).toBeInTheDocument();

    await act(() => user.click(discardBtn2));

    const homePageTitle = await findByText('Quizzes');
    expect(homePageTitle).toBeInTheDocument();
  });
});
