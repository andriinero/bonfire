import { findByText, screen, waitFor } from '@testing-library/dom';
import { setupServer } from 'msw/node';

import { mockDBData, serverHandlers } from '@/mocks/serverMock';

import {
  createRandomUser,
  getAuthDataFromUser,
  renderWithProviders,
} from '@/utils/test-utils';

import Home from '../pages/Home';

const server = setupServer(...serverHandlers);

const testUser = createRandomUser();
const authData = getAuthDataFromUser(testUser);

const { testMessages, testChatRoom } = mockDBData;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('fetches and displays chat room with messages', async () => {
  const { store } = renderWithProviders(
    <Home />,
    {
      preloadedState: {
        auth: { authData, token: 'testToken' },
      },
    },
    '/home/chats',
  );

  // expect(
  //   screen.getByText('No chat selected!', { exact: false }),
  // ).toBeInTheDocument();

  await waitFor(() => {
    // expect(screen.getByText(testMessages[0].body)).toBeInTheDocument();
  });
});
