import { describe, expect, it } from 'vitest';
import { renderWithProviders, initialState } from '../../utils/test-utils';
import { NotFoundPage } from './NotFoundPage';
import { MemoryRouter } from 'react-router-dom';

const renderFunction = () =>
  renderWithProviders(
    <MemoryRouter initialEntries={['/home']}>
      <NotFoundPage />
    </MemoryRouter>,
    {
      preloadedState: initialState,
    }
  );

describe('Not found page', () => {
  it('Not found page should have heading', () => {
    const { getByRole } = renderFunction();

    const heading = getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Page not found/i);
  });
});
