import { renderWithProviders } from '../../utils/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';
import { act } from 'react-dom/test-utils';

const initialState = {
  user: {
    darkMode: false,
  },
};

describe('Tooltip', () => {
  it('Tooltip contains children string', async () => {
    const string = 'This is a test string';
    renderWithProviders(
      <Tooltip text={string} position="right">
        <button>Button</button>
      </Tooltip>,
      {
        preloadedState: initialState,
      }
    );

    const TooltipElement = screen.getByText(string);

    expect(TooltipElement).toBeInTheDocument();
  });

  it('Tooltip visible on hover', async () => {
    const string = 'This is test string';
    const user = userEvent.setup();

    const { container } = renderWithProviders(
      <Tooltip text={string} position="right">
        <button>Button</button>
      </Tooltip>,
      {
        preloadedState: initialState,
      }
    );

    const tooltipContainer = container.getElementsByClassName('hidden')[0];

    await act(() => user.hover(tooltipContainer));

    expect(tooltipContainer).toHaveClass('tooltip-right');

    await act(() => user.unhover(tooltipContainer));

    expect(tooltipContainer).toHaveClass('hidden');
  });
});
