import { screen } from '@testing-library/dom';

import { renderWithProviders } from '@/utils/testUtils';

import { MemoryRouter } from 'react-router-dom';
import SignUp from '../SignUp';

it('renders sign up page', () => {
  renderWithProviders(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>,
  );

  expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
});

it('renders sign up page', () => {
  renderWithProviders(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>,
  );

  expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
});
