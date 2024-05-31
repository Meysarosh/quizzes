import { describe, expect, it } from 'vitest';

import { renderWithProviders, initialState } from '../../utils/test-utils';
import { Modal } from './Modal';
import { MemoryRouter } from 'react-router-dom';

const button = <button>Test button</button>;

const renderFunction = () =>
  renderWithProviders(
    <MemoryRouter initialEntries={['/quiz/1']}>
      <Modal isModal={false} title="Test modal" text="This is test modal">
        {button}
      </Modal>
    </MemoryRouter>,
    {
      preloadedState: initialState,
    }
  );

describe('Modal', () => {
  it('should be hidden by default', () => {
    const { getByTestId } = renderFunction();

    const modal = getByTestId('modal');
    expect(modal).toHaveClass('hidden');
  });
});
