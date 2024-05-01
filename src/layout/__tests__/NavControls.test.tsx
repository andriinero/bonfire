import { screen } from '@testing-library/dom';

import { renderWithProviders } from '@/utils/test-utils';

import { MemoryRouter } from 'react-router-dom';
import NavControls from '../NavControls';

it('renders nav controls', () => {
  renderWithProviders(
    <MemoryRouter>
      <NavControls />
    </MemoryRouter>,
  );

  const chatsTab = screen.getByRole('tab', { name: 'Chats Tab' });
  const contactsTab = screen.getByRole('tab', { name: 'Contacts Tab' });

  expect(chatsTab).toBeInTheDocument();
  expect(contactsTab).toBeInTheDocument();
});
