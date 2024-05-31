import { waitFor, fireEvent, createEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders, initialState } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { HomePage } from './HomePage';
import React from 'react';
import { server } from '../../mocks/server';
import selectEvent from 'react-select-event';
import { MemoryRouter } from 'react-router-dom';

const renderFunction = () =>
  renderWithProviders(
    <MemoryRouter initialEntries={['/home']}>
      <HomePage />
    </MemoryRouter>,
    {
      preloadedState: initialState,
    }
  );

describe('Home Page', () => {
  it('Homepage should have heading', async () => {
    const { getByText, queryByText } = renderFunction();

    expect(getByText(/Quizzes/i)).toBeInTheDocument();

    expect(queryByText(/login/i)).not.toBeInTheDocument();
  });

  it('if no response no QuizCard should be visible', async () => {
    const { queryByText } = renderFunction();

    expect(queryByText(/State and Props/i)).not.toBeInTheDocument();
  });

  it('rendered topics should be visible', async () => {
    const { findByText, queryByText } = renderFunction();

    expect(await findByText(/State and Props/i)).toBeInTheDocument();
    expect(await findByText(/React Basics/i)).toBeInTheDocument();
    expect(await findByText(/Components/i)).toBeInTheDocument();
    expect(await findByText(/html/)).toBeInTheDocument();
    expect(await findByText(/classes/i)).toBeInTheDocument();

    expect(queryByText(/Anything/i)).not.toBeInTheDocument();
  });

  it('Card should have a title, paragraph and a button', async () => {
    const { container, findByText } = renderFunction();

    expect(await findByText(/Components/i)).toBeInTheDocument();

    const card = container.getElementsByClassName('card')[0];

    expect(card).toBeInTheDocument();
    expect(card.firstChild).toHaveRole('heading');
    expect(card.firstChild.nextSibling).toHaveRole('paragraph');
    expect(card.lastChild).toHaveRole('button');
  });

  it('clicking on Start button on a Card should create a request for creating new quiz', async () => {
    let call;
    server.events.on('request:start', ({ request }) => {
      request.method === 'POST' && request.url === 'http://localhost:3000/quizzes'
        ? (call = 'POST createNewQuiz')
        : '';
    });

    const user = userEvent.setup();
    const { container, findByText } = renderFunction();

    expect(await findByText(/Components/i)).toBeInTheDocument();
    const card = container.getElementsByClassName('card')[0];
    await user.click(card.lastChild);

    await waitFor(() => expect(call === 'POST createNewQuiz').toBe(true));
  });

  it('Home Page should render Filter component', async () => {
    const { getByText } = renderFunction();

    expect(getByText('Filters')).toBeInTheDocument();
  });

  it('After clicking on filter button sidebar should be visible', async () => {
    const user = userEvent.setup();

    const setState = vi.fn();
    const spy = vi
      .spyOn(React, 'useState')
      .mockImplementationOnce((initState) => [initState, setState]);

    const { getByRole, getByText } = renderFunction();

    const sidebar = getByRole('complementary');
    expect(sidebar).toHaveClass('filter-hidden');

    const filterBtn = getByText('Quizzes').nextSibling;
    expect(filterBtn).toHaveRole('button');

    await user.click(filterBtn);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(sidebar).not.toHaveClass('filter-hidden');
  });

  it('After clicking outside filters, sidebar should close', async () => {
    const user = userEvent.setup();

    const { getByRole, getByText } = renderFunction();

    const sidebar = getByRole('complementary');
    expect(sidebar).toHaveClass('filter-hidden');

    const filterBtn = getByText('Quizzes').nextSibling;
    expect(filterBtn).toHaveRole('button');

    await user.click(filterBtn);

    expect(sidebar).not.toHaveClass('filter-hidden');

    const title = getByText('Quizzes');
    await user.click(title);

    expect(sidebar).toHaveClass('filter-hidden');
  });

  it('After clicking load more should request next portion on content', async () => {
    let call;
    server.events.on('request:start', ({ request }) => {
      request.method === 'GET' && request.url === 'http://localhost:4000/topics?&_page=2&_limit=8'
        ? (call = 'GET topics')
        : '';
    });

    const user = userEvent.setup();

    const { container, getByText, findByText } = renderFunction();

    expect(await findByText(/Components/i)).toBeInTheDocument();
    const cards = container.getElementsByClassName('card');

    expect(cards.length).toBe(8);

    const paginateBtn = getByText('Load more...');
    expect(paginateBtn).toBeInTheDocument();

    await user.click(paginateBtn);

    await waitFor(() => expect(call === 'GET topics').toBe(true));

    expect(await findByText(/React Testing/i)).toBeInTheDocument();
    const cards2 = container.getElementsByClassName('card');

    expect(cards2.length).toBe(16);
  });

  it('Rejected request on getPaginatedTopics creates an error', async () => {
    const user = userEvent.setup();

    const { store, getByText, findByText } = renderFunction();

    expect(await findByText(/Components/i)).toBeInTheDocument();

    const paginateBtn = getByText('Load more...');
    expect(paginateBtn).toBeInTheDocument();

    await user.click(paginateBtn);
    await user.click(paginateBtn);

    await vi.waitFor(() => expect(store.getState().user.error).toStrictEqual('An error occured!'));
  });

  it('After selecting quiz bank, local pagination should work', async () => {
    const { container, getByText, findByLabelText, findByText } = renderFunction();
    const user = userEvent.setup();
    const openFiltersBtn = getByText('Quizzes').nextSibling;
    const bankSelect = await findByLabelText('Quiz bank');

    await user.click(openFiltersBtn);

    await selectEvent.select(bankSelect, 'React');

    expect(await findByText(/Components/i)).toBeInTheDocument();
    const cards = container.getElementsByClassName('card');

    expect(cards.length).toBe(8);

    const paginateBtn = getByText('Load more...');
    expect(paginateBtn).toBeInTheDocument();

    await user.click(paginateBtn);

    expect(await findByText(/Test topic 9/i)).toBeInTheDocument();
    const cards2 = container.getElementsByClassName('card');

    expect(cards2.length).toBe(9);
  });

  it('If all available topics are displayed, pagination button should be hidden', async () => {
    const { getByText, findByLabelText, findByText } = renderFunction();
    const user = userEvent.setup();
    const openFiltersBtn = getByText('Quizzes').nextSibling;
    const bankSelect = await findByLabelText('Quiz bank');

    await user.click(openFiltersBtn);

    await selectEvent.select(bankSelect, 'React');

    expect(await findByText(/Components/i)).toBeInTheDocument();

    const paginateBtn = getByText('Load more...');
    expect(paginateBtn).toBeInTheDocument();

    await user.click(paginateBtn);

    expect(await findByText(/Test topic 9/i)).toBeInTheDocument();
    expect(paginateBtn.parentElement).toHaveClass('hidden');
  });

  it('When scrolling down button BackToTopButton should be visible, after scroll back to top it shold be hidden', async () => {
    const user = userEvent.setup();
    const { container } = renderFunction();

    window.scrollTo = vi.fn();
    window.scrollTo.mockImplementation(() => {
      fireEvent(window, createEvent.scroll(window, { target: { scrollY: 0 } }));
    });

    const button = container.firstChild.lastChild;

    expect(button).toHaveRole('button');
    expect(button).toHaveStyle('visibility: hidden');

    fireEvent(window, createEvent.scroll(window, { target: { scrollY: 251 } }));

    expect(button).toHaveStyle('visibility: visible');

    await user.click(button);

    expect(button).toHaveStyle('visibility: hidden');
  });
});

describe('Filters', () => {
  it('Filters should close after button close was clicked', async () => {
    const { getByText, getByRole } = renderFunction();
    const user = userEvent.setup();
    const openFiltersBtn = getByText('Quizzes').nextSibling;
    const closeFiltersBtn = getByText('Filters').nextSibling;
    const sidebar = getByRole('complementary');

    expect(sidebar).toHaveClass('filter-hidden');

    await user.click(openFiltersBtn);

    expect(sidebar).not.toHaveClass('filter-hidden');

    await user.click(closeFiltersBtn);

    expect(sidebar).toHaveClass('filter-hidden');
  });

  it('after selecting quiz bank - questions only related to selected quiz bank should be visible', async () => {
    const { queryByText, getByText, findByText, findByLabelText } = renderFunction();
    const user = userEvent.setup();
    const openFiltersBtn = getByText('Quizzes').nextSibling;

    await user.click(openFiltersBtn);

    const bankSelect = await findByLabelText('Quiz bank');

    await selectEvent.select(bankSelect, 'React');

    expect(await findByText(/React Basics/i)).toBeInTheDocument();
    expect(queryByText(/html/)).not.toBeInTheDocument();

    await selectEvent.select(bankSelect, 'HTML');

    expect(await findByText(/HTML Basics/i)).toBeInTheDocument();
    expect(queryByText(/React Basics/i)).not.toBeInTheDocument();
  });

  it('Topic bank, Difficulty and User answers menu is disabled until not selected a quiz bank', async () => {
    const { getByText, findByText, findByLabelText } = renderFunction();
    const user = userEvent.setup();
    const openFiltersBtn = getByText('Quizzes').nextSibling;
    const bankSelect = await findByLabelText('Quiz bank');
    const topicSelect = await findByLabelText('Topic bank');
    const difficultySelect = await findByText('Difficulty');
    const userAnswersSelect = await findByText('User answers');

    await user.click(openFiltersBtn);

    expect(topicSelect).toBeDisabled();
    expect(difficultySelect).toHaveClass('menu-disabled');
    expect(userAnswersSelect).toHaveClass('menu-disabled');

    await selectEvent.select(bankSelect, 'React');

    expect(topicSelect).not.toBeDisabled();
    expect(difficultySelect).not.toHaveClass('menu-disabled');
    expect(userAnswersSelect).not.toHaveClass('menu-disabled');
  });

  it('available options for topic bank select menu should be only related to selected quiz bank', async () => {
    const {
      getByText,
      findByLabelText,
      getAllByText,
      getByLabelText,
      queryAllByText,
      findAllByText,
    } = renderFunction();
    const user = userEvent.setup();
    const openFiltersBtn = getByText('Quizzes').nextSibling;
    const bankSelect = await findByLabelText('Quiz bank');

    expect(getAllByText(/React Basics/i).length).toBe(1);
    expect(getAllByText(/React Components/i).length).toBe(1);
    expect(getAllByText(/State and Props/i).length).toBe(1);
    expect(getAllByText(/HTML/).length).toBe(1);

    await user.click(openFiltersBtn);
    await selectEvent.select(bankSelect, 'React');

    selectEvent.openMenu(getByLabelText('Topic bank'));
    const textOccurencies = await findAllByText(/React Basics/i);

    expect(textOccurencies.length).toBe(2);
    expect(getAllByText(/React Components/i).length).toBe(2);
    expect(getAllByText(/State and Props/i).length).toBe(2);
    expect(queryAllByText(/HTML/).length).toBe(0);
  });

  it('only questions related to selected topic bank should be visible', async () => {
    const { getByText, findByLabelText, findByText, findAllByText, queryByText } = renderFunction();
    const user = userEvent.setup();
    const openFiltersBtn = getByText('Quizzes').nextSibling;
    const bankSelect = await findByLabelText('Quiz bank');
    const topicSelect = await findByLabelText('Topic bank');

    await user.click(openFiltersBtn);
    await selectEvent.select(bankSelect, 'React');

    expect(await findByText('React Basics')).toBeInTheDocument();
    expect(await findByText('React Components')).toBeInTheDocument();

    await selectEvent.select(topicSelect, 'React Components');
    const searchedText = await findAllByText('React Components');

    expect(searchedText.length).toBe(2);
    expect(queryByText('React Basics')).not.toBeInTheDocument();
  });

  it('difficulty menu should open/close onclick', async () => {
    const user = userEvent.setup();
    const { getByText, getByTestId, findByLabelText } = renderFunction();
    const openFiltersBtn = getByText('Quizzes').nextSibling;
    const bankSelect = await findByLabelText('Quiz bank');
    const difficultyControll = getByTestId('diff-ctrl');
    const difficultyMenu = difficultyControll.nextSibling;

    await user.click(openFiltersBtn);
    await selectEvent.select(bankSelect, 'React');

    expect(difficultyMenu).toHaveClass('hidden');

    await user.click(difficultyControll);

    expect(difficultyMenu).not.toHaveClass('hidden');

    await user.click(bankSelect);

    expect(difficultyMenu).toHaveClass('hidden');
  });

  it('difficulty checkbox All should change all checkboxes for difficulties', async () => {
    const user = userEvent.setup();
    const { getByText, getByTestId, findByRole, findByLabelText } = renderFunction();
    const openFiltersBtn = getByText('Quizzes').nextSibling;
    const bankSelect = await findByLabelText('Quiz bank');
    const difficultyControll = getByTestId('diff-ctrl');

    await user.click(openFiltersBtn);
    await selectEvent.select(bankSelect, 'React');
    await user.click(difficultyControll);

    const checkboxAll = await findByRole('checkbox', { name: 'All' });
    const checkboxBeginer = await findByRole('checkbox', { name: 'Beginner' });

    expect(checkboxAll).toBeChecked();
    expect(checkboxBeginer).toBeChecked();

    await user.click(checkboxAll);

    expect(checkboxAll).not.toBeChecked();
    expect(checkboxBeginer).not.toBeChecked();
  });

  it('only selected difficulty questions should be visible', async () => {
    const user = userEvent.setup();
    const { getByText, getByTestId, findByText, findByRole, findByLabelText, queryByText } =
      renderFunction();
    const openFiltersBtn = getByText('Quizzes').nextSibling;
    const bankSelect = await findByLabelText('Quiz bank');
    const difficultyControll = getByTestId('diff-ctrl');

    await user.click(openFiltersBtn);
    await selectEvent.select(bankSelect, 'React');
    await user.click(difficultyControll);

    const checkboxAll = await findByRole('checkbox', { name: 'All' });
    const checkboxBeginer = await findByRole('checkbox', { name: 'Beginner' });

    await user.click(checkboxAll);

    expect(queryByText(/React Basics/i)).not.toBeInTheDocument();
    expect(queryByText(/React Components/i)).not.toBeInTheDocument();

    await user.click(checkboxAll);
    await user.click(checkboxBeginer);

    expect(queryByText(/React Basics/i)).not.toBeInTheDocument();
    expect(await findByText(/React Components/i)).toBeInTheDocument();
  });

  it('user answers menu should open/close onclick', async () => {
    const user = userEvent.setup();
    const { getByText, getByTestId, findByLabelText } = renderFunction();
    const openFiltersBtn = getByText('Quizzes').nextSibling;
    const bankSelect = await findByLabelText('Quiz bank');
    const userAnswerControll = getByTestId('user_answer-ctrl');
    const userAnswerMenu = userAnswerControll.nextSibling;

    await user.click(openFiltersBtn);
    await selectEvent.select(bankSelect, 'React');

    expect(userAnswerMenu).toHaveClass('hidden');

    await user.click(userAnswerControll);

    expect(userAnswerMenu).not.toHaveClass('hidden');

    await user.click(bankSelect);

    expect(userAnswerMenu).toHaveClass('hidden');
  });

  it('user answers filter should filter for unanswered, correctly and incorrectly answered questions', async () => {
    //State and Props - unanswered, React Basics - correctly answered, React Components - incorrectly answered
    const user = userEvent.setup();
    const { store, getByText, getByTestId, getByRole, findByText, findByLabelText, queryByText } =
      renderFunction();
    const openFiltersBtn = getByText('Quizzes').nextSibling;
    const bankSelect = await findByLabelText('Quiz bank');
    const userAnswerControll = getByTestId('user_answer-ctrl');

    await user.click(openFiltersBtn);
    await selectEvent.select(bankSelect, 'React');
    await user.click(userAnswerControll);

    const unanswered = getByRole('checkbox', { name: 'unanswered' });
    const answered = getByRole('checkbox', { name: 'answered' });
    const correctly = getByRole('checkbox', { name: 'correct' });
    const incorrectly = getByRole('checkbox', { name: 'incorrect' });

    expect(getByText('React Basics')).toBeInTheDocument();
    expect(getByText('React Components')).toBeInTheDocument();
    expect(getByText('State and Props')).toBeInTheDocument();

    await user.click(answered);

    expect(await findByText('State and Props')).toBeInTheDocument();
    expect(queryByText('React Basics')).not.toBeInTheDocument();
    expect(queryByText('React Components')).not.toBeInTheDocument();

    await user.click(answered);
    await user.click(unanswered);

    expect(await findByText('React Basics')).toBeInTheDocument();
    expect(await findByText('React Components')).toBeInTheDocument();
    expect(queryByText('State and Props')).not.toBeInTheDocument();

    await user.click(correctly);

    expect(await findByText('React Components')).toBeInTheDocument();
    expect(queryByText('React Basics')).not.toBeInTheDocument();
    expect(queryByText('State and Props')).not.toBeInTheDocument();

    await user.click(correctly);
    await user.click(incorrectly);

    expect(await findByText('React Basics')).toBeInTheDocument();
    expect(queryByText('React Components')).not.toBeInTheDocument();
    expect(queryByText('State and Props')).not.toBeInTheDocument();

    await user.click(incorrectly);
    await user.click(correctly);
    await user.click(answered);

    expect(store.getState().filters.selectedFilters.isCorrectlyAnswered === true).toBe(true);
    expect(store.getState().filters.selectedFilters.isIncorrectlyAnswered === true).toBe(true);

    await user.click(incorrectly);

    expect(store.getState().filters.selectedFilters.isCorrectlyAnswered === true).toBe(true);
    expect(store.getState().filters.selectedFilters.isIncorrectlyAnswered === false).toBe(true);

    await user.click(answered);

    expect(store.getState().filters.selectedFilters.isCorrectlyAnswered === true).toBe(true);
    expect(store.getState().filters.selectedFilters.isIncorrectlyAnswered === true).toBe(true);
  });

  it('questions quantity is setting selectedFilters.quantity in filters state', async () => {
    const user = userEvent.setup();
    const { store, getByText, findByLabelText } = renderFunction();
    const openFiltersBtn = getByText('Quizzes').nextSibling;
    const quantitySelect = await findByLabelText('Questions quantity:');
    const state = store.getState();

    expect(state.filters.selectedFilters.quantity === null).toBe(true);

    await user.click(openFiltersBtn);
    await selectEvent.select(quantitySelect, '5');

    expect(store.getState().filters.selectedFilters.quantity === 5).toBe(true);
  });
});
