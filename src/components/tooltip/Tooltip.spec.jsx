import { renderWithProviders } from '../../utils/test-utils';
import { screen } from '@testing-library/react';
import { Tooltip } from './Tooltip';

const initialState = {
  user: {
    darkMode: false,
  },
};

test('Tooltip contains children string', () => {
  const string = 'This is test string';

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
