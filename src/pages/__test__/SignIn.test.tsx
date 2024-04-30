import { screen } from '@testing-library/dom';

import { renderWithProviders } from '@/utils/test-utils';

import { MemoryRouter } from 'react-router-dom';
import SignIn from '../SignIn';
import { createRandomUser, getAuthDataFromUser } from '@/utils/testData';

const testUser = createRandomUser();
const testAuthData = getAuthDataFromUser(testUser);

vi.mock('@/features/auth/components/SignInPanel', () => ({
  default: () => <div>Test Sign In Panel</div>,
}));

it('renders the sign in page', () => {
  renderWithProviders(
    <MemoryRouter>
      <SignIn />
    </MemoryRouter>,
  );

  const header = screen.getByRole('heading', { name: /Sign In/i });

  expect(header).toBeInTheDocument();
});

it('redirects you when signed in ', () => {
  renderWithProviders(
    <MemoryRouter>
      <SignIn />
    </MemoryRouter>,
    {
      preloadedState: { auth: { authData: testAuthData, token: 'testToken' } },
    },
  );

  const header = screen.queryByRole('heading', { name: /Sign In/i });

  expect(header).not.toBeInTheDocument();
});
