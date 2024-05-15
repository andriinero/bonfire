import { screen, waitFor } from '@testing-library/dom';
import { setupServer } from 'msw/node';

import { mockDBData, serverHandlers } from '@/mocks/serverMock';
import { renderWithProviders } from '@/utils/test-utils';

import Paths from '@/constants/Paths';
import ChatRoomSidebar from '@/features/chatRooms/components/ChatRoomSidebar';
import Home from '@/pages/Home';
import type { ChatRoom } from '@/types/ChatRoom';
import userEvent from '@testing-library/user-event';
import { HttpResponse, delay, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const { testMessages, testChatRoom } = mockDBData;

const server = setupServer(...serverHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('renders empty chat list', async () => {
  window.HTMLElement.prototype.scrollTo = () => {};
  server.use(
    http.get<never, never, ChatRoom[]>('/api/chat-rooms', async () => {
      await delay(150);
      return HttpResponse.json([]);
    }),
  );
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

  await waitFor(() => {
    expect(screen.queryAllByLabelText('chat-message')).toHaveLength(0);
  });
});

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

it('renders and submits create new chat room request', async () => {
  window.HTMLElement.prototype.scrollTo = () => {};
  server.use(
    http.get<never, never, ChatRoom[]>('/api/chat-rooms', async () => {
      await delay(150);
      return HttpResponse.json([]);
    }),
  );
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
  const user = userEvent.setup();

  const openFormButton = screen.getByRole('button', { name: /Open create/i });
  await user.click(openFormButton);

  const usernameField = screen.getByRole('textbox', { name: /Username/i });
  expect(usernameField).toBeInTheDocument();

  server.use(
    http.get<never, never, ChatRoom[]>('/api/chat-rooms', async () => {
      await delay(150);
      return HttpResponse.json([testChatRoom]);
    }),
  );
  const submitButton = screen.getByRole('button', { name: 'Create' });
  await user.type(usernameField, 'testUsername');
  await user.click(submitButton);

  await waitFor(() => {
    expect(
      screen.getAllByRole('heading', { name: testChatRoom.name }),
    ).toHaveLength(2);
  });
});
