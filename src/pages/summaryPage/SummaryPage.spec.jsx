import { waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders, initialState } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { SummaryPage } from './SummaryPage';
import { QuizPage } from '../quizPage/QuizPage';
import * as reactRouter from 'react-router';
import { act } from 'react-dom/test-utils';

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
