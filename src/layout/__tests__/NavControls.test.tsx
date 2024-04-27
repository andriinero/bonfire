import { screen } from '@testing-library/dom';
import NavControls from '../NavControls';
import { renderWithProviders } from '@/utils/test-utils';

it('renders nav controls', () => {
  renderWithProviders(<NavControls />);

  const chatsTab = screen.getByRole('tab', { name: 'Chats Tab' });
  const contactsTab = screen.getByRole('tab', { name: 'Contacts Tab' });

  expect(chatsTab).toBeInTheDocument();
  expect(contactsTab).toBeInTheDocument();
});
