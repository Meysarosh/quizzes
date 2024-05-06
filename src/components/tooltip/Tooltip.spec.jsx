import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../styles/ThemeProvider';
import { Tooltip } from './Tooltip';

test('Tooltip contains children string', () => {
  const string = 'This is test string';
  render(
    <ThemeProvider>
      <Tooltip>{string}</Tooltip>
    </ThemeProvider>
  );
  const TooltipElement = screen.getByText(string);

  expect(TooltipElement).toBeInTheDocument();
});
