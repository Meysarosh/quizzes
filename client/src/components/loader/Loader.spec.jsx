import { describe, expect, it } from 'vitest';
import { renderWithProviders, initialState } from '../../utils/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { Loader } from './Loader';

const loadingState = {
  ...initialState,
  user: {
    ...initialState.user,
    isLoading: true,
  },
};

const renderFunction = () =>
  renderWithProviders(
    <MemoryRouter initialEntries={['/summary']}>
      <Loader></Loader>
    </MemoryRouter>,
    {
      preloadedState: loadingState,
    }
  );
describe('Loader', () => {
  it('should have classname rotating', () => {
    const { getByTestId } = renderFunction();

    const loader = getByTestId('loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('rotating');
  });

  it('should have classname rotating', () => {
    const { getByTestId } = renderWithProviders(
      <MemoryRouter initialEntries={['/summary']}>
        <Loader></Loader>
      </MemoryRouter>,
      {
        preloadedState: initialState,
      }
    );

    const loader = getByTestId('loader');
    expect(loader).toBeInTheDocument();
    expect(loader).not.toHaveClass('rotating');
  });
});
