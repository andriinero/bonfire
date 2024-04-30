import { screen, waitFor } from '@testing-library/dom';
import { setupServer } from 'msw/node';

import { mockDBData, serverHandlers } from '@/mocks/serverMock';

import { renderWithProviders } from '@/utils/test-utils';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import ChatRoomSidebar from '@/features/chatRooms/components/ChatRoomSidebar';

const server = setupServer(...serverHandlers);

const { testMessages } = mockDBData;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('fetches and displays chat room with messages', async () => {
  window.HTMLElement.prototype.scrollTo = () => {};

  renderWithProviders(
    <MemoryRouter initialEntries={['/home/chats']}>
      <Routes>
        <Route path="home" element={<Home />}>
          <Route path="chats" element={<ChatRoomSidebar />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

  await waitFor(() => {
    expect(
      screen.getAllByText(testMessages[0].body, { exact: false }),
    ).toHaveLength(2);
  });
});
