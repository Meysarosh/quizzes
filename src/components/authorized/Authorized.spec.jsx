import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders, initialState } from '../../utils/test-utils';
import { Authorized } from './Authorized';
import { MemoryRouter } from 'react-router-dom';
import * as reactRouter from 'react-router';

const stateWithoutToken = {
  ...initialState,
  token: {
    token: null,
  },
};

describe('Authorized HOC', () => {
  it('should navigate to login page if no token', async () => {
    const navigate = vi.fn();
    vi.spyOn(reactRouter, 'useNavigate').mockImplementation(() => navigate);

    renderWithProviders(
      <MemoryRouter initialEntries={['/home']}>
        <Authorized />
      </MemoryRouter>,
      {
        preloadedState: stateWithoutToken,
      }
    );

    expect(navigate).toHaveBeenCalledWith('/');
  });
});
