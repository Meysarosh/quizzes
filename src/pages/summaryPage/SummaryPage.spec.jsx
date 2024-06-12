import { waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders, initialState } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { SummaryPage } from './SummaryPage';
import { QuizPage } from '../quizPage/QuizPage';
import * as reactRouter from 'react-router';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { Pdf } from './Pdf';

const initialStateForSummary = {
  ...initialState,
  user: {
    ...initialState.user,
    history: ['/home', '/quiz/1', '/summary/1'],
  },
};

const initialStateForMultiAnswerSummary = {
  ...initialState,
  user: {
    ...initialState.user,
    history: ['/home', '/quiz/2', '/summary/2'],
  },
};

const initialStateForPdf = {
  ...initialStateForSummary,

  quiz: {
    userId: 1,
    isFinished: true,
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
    questions: [1, 49],
    submittedAnswers: [1, 2],
    correctAnswers: [1, 1],
    date: 1716980237670,
    id: 1,
  },
};

const initialStateForPdfNodata = {
  ...initialStateForPdf,
  user: {
    ...initialStateForPdf.user,
    user: { ...initialStateForPdf.user.user, answerStat: {} },
  },
};

const router = createMemoryRouter(
  [
    { path: '/summary/:id', element: <SummaryPage /> },
    { path: '/quiz/:id', element: <QuizPage /> },
  ],
  {
    initialEntries: ['/', '/summary/1'],
    initialIndex: 1,
  }
);

const router2 = createMemoryRouter(
  [
    { path: '/summary/:id', element: <SummaryPage /> },
    { path: '/quiz/:id', element: <QuizPage /> },
  ],
  {
    initialEntries: ['/', '/summary/2'],
    initialIndex: 1,
  }
);

const renderFunction = () =>
  renderWithProviders(<RouterProvider router={router} />, {
    preloadedState: initialStateForSummary,
  });

describe('Summary Page', () => {
  it('Summary page should have heading containing the topic name of the quiz', async () => {
    const { findByRole } = renderFunction();

    const heading = await findByRole('heading', { name: 'Quiz #1 Summary: React Basics' });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Quiz #1 Summary: React Basics');
  });

  it('Summary page should contain questions and answers', async () => {
    const { findAllByText, findByText } = renderFunction();

    const questions = await findAllByText('What is React?');
    const answer1 = await findByText('A JavaScript library for building user interfaces');
    const answer2 = await findByText('React is a JavaScript library for building user interfaces.');

    expect(questions).toHaveLength(2);
    expect(answer1).toBeInTheDocument();
    expect(answer2).toBeInTheDocument();
  });

  it('correctly answered answers should have color green, incorrectly - red, correct answers - yellow', async () => {
    const { findByText } = renderFunction();

    const answer1 = await findByText('A JavaScript library for building user interfaces');
    const answer2 = await findByText('React is a JavaScript library for building user interfaces.');
    const answer3 = await findByText('React is a programming language.');

    expect(answer1).toHaveClass('green');
    expect(answer2).toHaveClass('yellow');
    expect(answer3).toHaveClass('red');
  });

  it('Summary page should have 3 buttons: Retake, RetakeAll and Leave', async () => {
    const { findByRole } = renderFunction();

    const buttonRetake = await findByRole('button', { name: 'Retake' });

    const buttonRetakeAll = await findByRole('button', { name: /Retake All/ });
    const buttonLeave = await findByRole('button', { name: /Leave/ });

    expect(buttonRetake).toBeInTheDocument();
    expect(buttonRetakeAll).toBeInTheDocument();
    expect(buttonLeave).toBeInTheDocument();
  });

  it('when leave button is pressed should navigate to home page', async () => {
    const navigate = vi.fn();
    vi.spyOn(reactRouter, 'useNavigate').mockImplementation(() => navigate);

    const user = userEvent.setup();
    const { findByRole } = renderFunction();

    const buttonLeave = await findByRole('button', { name: /Leave/ });

    expect(buttonLeave).toBeInTheDocument();

    await act(() => user.click(buttonLeave));

    expect(navigate).toHaveBeenCalledWith('/home');
  });

  it('Clicking on Retake button should prepair quiz for copy whith incorrectly answered questions', async () => {
    const user = userEvent.setup();
    const { store, findByRole } = renderFunction();

    const buttonRetake = await findByRole('button', { name: 'Retake' });
    expect(buttonRetake).toBeInTheDocument();

    expect(store.getState().quiz.quiz.questions).toStrictEqual([1, 49]);
    expect(store.getState().summary.incorrectlyAnsweredQid).toStrictEqual([49]);

    await act(() => user.click(buttonRetake));

    await waitFor(() => expect(store.getState().quiz.quiz.questions).toStrictEqual([49]));
  });

  it('Clicking on RetakeAll button should prepair quiz for copy whith all questions', async () => {
    const user = userEvent.setup();
    const { store, findByRole } = renderFunction();

    const buttonRetakeAll = await findByRole('button', { name: 'Retake All' });
    expect(buttonRetakeAll).toBeInTheDocument();

    expect(store.getState().quiz.quiz.questions).toStrictEqual([1, 49]);

    await act(() => user.click(buttonRetakeAll));

    await waitFor(() => expect(store.getState().quiz.quiz.questions).toStrictEqual([1, 49]));
  });

  it('Should properly display correct, incorrect and partial answers', async () => {
    const { findByText } = renderWithProviders(<RouterProvider router={router2} />, {
      preloadedState: initialStateForMultiAnswerSummary,
    });

    const answer1q1 = await findByText('useHistory');
    const answer3q2 = await findByText('useLocation2');
    const answer1q3 = await findByText('useRouteMatch2');

    expect(answer1q1).toBeInTheDocument();
    expect(answer1q1).toHaveClass('green');
    expect(answer3q2).toHaveClass('red');
    expect(answer1q3).toHaveClass('yellow');
  });
});

describe('Pdf component', () => {
  it('Should display user statistics', () => {
    const { getByRole, getByTestId } = renderWithProviders(
      <MemoryRouter initialEntries={['/summary/1']}>
        <Pdf
          user={initialStateForPdf.user.user}
          quiz={initialStateForPdf.quiz}
          correct={initialStateForPdf.summary.correctlyAnsweredQid.length}
          incorrect={
            initialStateForPdf.summary.incorrectlyAnsweredQid.length +
            initialStateForPdf.summary.partialyAnsweredQ.length
          }
          unanswered={initialStateForPdf.summary.unansweredQid.length}
        />
      </MemoryRouter>,
      {
        preloadedState: initialStateForPdf,
      }
    );

    const reactCorrect = getByTestId('react-correct');
    const htmlCorrect = getByTestId('html-correct');
    const cssCorrect = getByTestId('css-correct');
    const scssCorrect = getByTestId('scss-correct');
    const javaCorrect = getByTestId('java-correct');
    const typeCorrect = getByTestId('type-correct');

    const heading1 = getByRole('heading', { name: 'HTML answers:' });
    expect(heading1).toBeInTheDocument();

    expect(reactCorrect).toHaveTextContent(`correct: 6`);
    expect(htmlCorrect).toHaveTextContent(`correct: 6`);
    expect(cssCorrect).toHaveTextContent(`correct: 6`);
    expect(scssCorrect).toHaveTextContent(`correct: 6`);
    expect(javaCorrect).toHaveTextContent(`correct: 6`);
    expect(typeCorrect).toHaveTextContent(`correct: 6`);
  });

  it('Should display user statistics', () => {
    const { getByTestId } = renderWithProviders(
      <MemoryRouter initialEntries={['/summary/1']}>
        <Pdf
          user={initialStateForPdfNodata.user.user}
          quiz={initialStateForPdfNodata.quiz}
          correct={initialStateForPdfNodata.summary.correctlyAnsweredQid.length}
          incorrect={
            initialStateForPdfNodata.summary.incorrectlyAnsweredQid.length +
            initialStateForPdfNodata.summary.partialyAnsweredQ.length
          }
          unanswered={initialStateForPdfNodata.summary.unansweredQid.length}
        />
      </MemoryRouter>,
      {
        preloadedState: initialStateForPdfNodata,
      }
    );

    const reactCorrect = getByTestId('react-correct');
    const htmlCorrect = getByTestId('html-correct');
    const cssCorrect = getByTestId('css-correct');
    const scssCorrect = getByTestId('scss-correct');
    const javaCorrect = getByTestId('java-correct');
    const typeCorrect = getByTestId('type-correct');

    expect(reactCorrect).toHaveTextContent(`correct: 0`);
    expect(htmlCorrect).toHaveTextContent(`correct: 0`);
    expect(cssCorrect).toHaveTextContent(`correct: 0`);
    expect(scssCorrect).toHaveTextContent(`correct: 0`);
    expect(javaCorrect).toHaveTextContent(`correct: 0`);
    expect(typeCorrect).toHaveTextContent(`correct: 0`);
  });
});
