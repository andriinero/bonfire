import { screen, waitFor } from '@testing-library/dom';

import { setupServer } from 'msw/node';
import { renderWithProviders } from '@/utils/test-utils';
import { mockDBData, serverHandlers } from '@/mocks/serverMock';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ContactsSidebar from '../ContactsSidebar';
import Home from '@/pages/Home';
import Paths from '@/constants/Paths';

const { testUser } = mockDBData;

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
    expect(screen.getByText(testUser.username)).toBeInTheDocument();
  });
});

it('', () => {});
