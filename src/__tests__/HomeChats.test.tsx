import { setupServer } from 'msw/node';
import { screen, waitFor } from '@testing-library/dom';

import { mockDBData, serverHandlers } from '@/mocks/serverMock';
import { renderWithProviders } from '@/utils/test-utils';

import Home from '@/pages/Home';
import ChatRoomSidebar from '@/features/chatRooms/components/ChatRoomSidebar';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Paths from '@/constants/Paths';

const { testMessages } = mockDBData;

const server = setupServer(...serverHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('fetches and displays chat room with messages', async () => {
  window.HTMLElement.prototype.scrollTo = () => {};
  renderWithProviders(
    <MemoryRouter initialEntries={[Paths.Home.BASE + Paths.Home.CHATS]}>
      <Routes>
        <Route path={Paths.Home.BASE} element={<Home />}>
          <Route
            path={Paths.Home.BASE + Paths.Home.CHATS}
            element={<ChatRoomSidebar />}
          />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

  expect(screen.getByAltText('User Icon')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Messages' })).toBeInTheDocument();
  expect(screen.queryAllByLabelText('chat-message')).toHaveLength(0);
  await waitFor(() => {
    expect(screen.queryAllByLabelText('chat-message')).toHaveLength(
      testMessages.length,
    );
  });
});
