import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Paths from '@/constants/Paths';
import { renderWithProviders } from '@/utils/testUtils';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import NotFound404 from '../NotFound404';

it('renders 404 page correctly', () => {
  renderWithProviders(
    <MemoryRouter>
      <NotFound404 />
    </MemoryRouter>,
  );

  const notFoundHeader = screen.getByRole('heading', { name: /Not found/i });
  const pardonMessage = screen.getByText('Sorry', { exact: false });

  expect(notFoundHeader).toBeInTheDocument();
  expect(pardonMessage).toBeInTheDocument();
});

it('redirects user to sign in page on back to home link click', async () => {
  renderWithProviders(
    <MemoryRouter initialEntries={[Paths.Error.NOT_FOUND]}>
      <Routes>
        <Route path={Paths.Error.NOT_FOUND} element={<NotFound404 />} />
        <Route path={Paths.Auth.SIGN_IN} element={<p>sign in</p>} />
      </Routes>
    </MemoryRouter>,
  );
  const user = userEvent.setup();

  const backToHomeLink = screen.getByRole('link', { name: /back to/i });
  await user.click(backToHomeLink);

  expect(screen.getByText('sign in', { exact: false })).toBeInTheDocument();
});
