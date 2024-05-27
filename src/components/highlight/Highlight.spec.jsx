import { describe, expect, it } from 'vitest';
import { renderWithProviders, initialState } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { Highlight } from './Highlight';
import { MemoryRouter } from 'react-router-dom';

const highlightOnInitialState = {
  ...initialState,
  highlight: {
    highlight: {
      isHighlight: true,
      highlighted: [],
    },
  },
};

const paragraph = <p>Test text</p>;

const renderFunction = () =>
  renderWithProviders(
    <MemoryRouter initialEntries={['/summary']}>
      <Highlight>{paragraph}</Highlight>
    </MemoryRouter>,
    {
      preloadedState: highlightOnInitialState,
    }
  );

describe('Highlight', () => {
  it('Should display the child element', async () => {
    const { getByText } = renderFunction();

    const string = getByText('Test text');
    expect(string).toBeInTheDocument();
  });

  it('should highlight the text when selected and unhighlight when click on highlighted', async () => {
    const user = userEvent.setup();
    const { container, getByText } = renderFunction();

    const string = getByText('Test text');

    await user.dblClick(string);

    const highlightedSpan = container.getElementsByClassName('highlighted')[0];

    await waitFor(() => expect(highlightedSpan).toBeInTheDocument());

    await user.click(highlightedSpan);

    await waitFor(() => expect(highlightedSpan).not.toBeInTheDocument());
  });
});
