import { screen, waitFor } from '@testing-library/dom';

import { setupServer } from 'msw/node';
import { renderWithProviders } from '@/utils/testUtils';
import { mockDBData, serverHandlers } from '@/mocks/serverMock';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ContactsSidebar from '../ContactsSidebar';
import Home from '@/pages/Home';
import Paths from '@/constants/Paths';
import userEvent from '@testing-library/user-event';
import { HttpResponse, delay, http } from 'msw';
import type { User } from '@/types/User';

const { testUser, testContacts } = mockDBData;

const server = setupServer(...serverHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('fetches and displays user contacts', async () => {
  window.HTMLElement.prototype.scrollTo = () => {};
  renderWithProviders(
    <MemoryRouter initialEntries={[Paths.Home.BASE + Paths.Home.CHATS]}>
      <Routes>
        <Route path={Paths.Home.BASE} element={<Home />}>
          <Route
            path={Paths.Home.BASE + Paths.Home.CHATS}
            element={<ContactsSidebar />}
          />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'Contacts' })).toBeInTheDocument();
  expect(screen.getByLabelText('Spinner Icon')).toBeInTheDocument();

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: testUser.username }),
    ).toBeInTheDocument();
  });
});

it('renders create new contact form and submits new contact', async () => {
  const user = userEvent.setup();
  renderWithProviders(<ContactsSidebar />);

  const openForm = screen.getByRole('button', { name: /Create Contact/ });
  await user.click(openForm);
  expect(screen.getByRole('heading', { name: /Create Contact/i }));

  server.use(
    http.get<never, never, User[]>('/api/profile/contacts', async () => {
      await delay(150);
      return HttpResponse.json(testContacts.concat(testUser));
    }),
  );

  const usernameField = screen.getByRole('textbox', { name: /Username/i });
  await user.type(usernameField, 'test');
  await user.click(screen.getByRole('button', { name: 'Create' }));
  await waitFor(() => {
    screen.debug();
    expect(
      screen.getByRole('heading', { name: testUser.username }),
    ).toBeInTheDocument();
  });
});
