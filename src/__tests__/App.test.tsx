import Home from '@/pages/Home';
import Protected from '@/pages/Protected';
import { renderWithProviders } from '@/utils/test-utils';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

it('redirects on authorization fail', async () => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/home']}>
      <Routes>
        <Route
          path="home"
          element={
            <Protected>
              <p>Authorized</p>
            </Protected>
          }
        />
      </Routes>
    </MemoryRouter>,
  );

  const authorized = screen.queryByText('authorized', { exact: false });

  expect(authorized).not.toBeInTheDocument();
});

it('redirects on sign out', async () => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/home']}>
      <Routes>
        <Route path="home" element={<Home />} />
      </Routes>
    </MemoryRouter>,
  );
  const user = userEvent.setup();

  await user.click(screen.getByLabelText('Sign Out'));

  expect(screen.queryByLabelText('Sign Out')).not.toBeInTheDocument();
});
