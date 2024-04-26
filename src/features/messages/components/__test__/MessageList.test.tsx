it('', () => {});
// import { testAuthData, testMessages, testParticipant } from '@/data/testData';
// import { MessageData } from '@/types/MessageData';
// import { renderWithProviders } from '@/utils/test-utils';
// import { HttpResponse, delay, http } from 'msw';
// import { setupServer } from 'msw/node';
// import MessageList from '../MessageList';
// import { screen, waitFor } from '@testing-library/dom';

// const handlers = [
//   http.get<{ chatroomid: string }, never, MessageData[]>(
//     '/api/chat-rooms/:chatroomid/messages',
//     async ({ params }) => {
//       await delay(150);
//       const { chatroomid } = params;
//       const messageList = testMessages.filter(
//         (m) => m.chat_room === chatroomid,
//       );

//       return HttpResponse.json(messageList);
//     },
//   ),
//   // http.get<never, never, AuthData>('/api/auth/data', async () => {
//   //   return HttpResponse.json(testAuthData);
//   // }),
// ];

// const server = setupServer(...handlers);

// beforeEach(() => {
//   server.listen();
// });

// afterEach(() => {
//   server.resetHandlers();
// });

// afterAll(() => {
//   server.close();
// });

// it('renders message list', async () => {
//   const { store } = renderWithProviders(<MessageList />, {
//     preloadedState: {
//       chat: { selectedChatId: 'johnchat01' },
//       auth: { authData: testAuthData, token: 'newToken' },
//     },
//   });

//   await waitFor(() => {
//     console.log(store.getState().api.queries);
//     expect(
//       screen.getByText('chat room created', { exact: false }),
//     ).toBeInTheDocument();
//   });
// });
