import { faker } from '@faker-js/faker';
import { HttpResponse, delay, http } from 'msw';

import testData from '@/utils/TestData';

import type { AuthData } from '@/types/AuthData';
import type { ChatRoom } from '@/types/ChatRoom';
import type { Message } from '@/types/Message';
import type { User } from '@/types/User';

const testUser = testData.createRandomUser(),
  testContacts = testData.getMultipleRandomUsers(2),
  testAuthData = testData.getAuthDataFromUser(testUser),
  testChatRoom = testData.createChatRoom(),
  testMessages = testData.getMultipleRandomMessages(
    5,
    testChatRoom.id,
    testUser,
  ),
  token = faker.string.uuid();

export const mockDBData = {
  testUser,
  testContacts,
  testAuthData,
  testChatRoom,
  testMessages,
  token,
} as const;

export const serverHandlers = [
  http.get<never, never, AuthData>('/api/auth/data', async () => {
    await delay(150);
    return HttpResponse.json(testAuthData);
  }),
  http.post<never, never, { message: string; token: string }>(
    '/api/auth/sign-in',
    async () => {
      await delay(150);
      return HttpResponse.json({ message: 'Success', token });
    },
  ),
  http.get<never, never, ChatRoom[]>('/api/chat-rooms', async () => {
    await delay(150);
    return HttpResponse.json([testChatRoom]);
  }),
  http.get<{ chatroomid: string }, never, Message[]>(
    '/api/chat-rooms/:chatroomid/messages',
    async () => {
      await delay(150);
      return HttpResponse.json(testMessages);
    },
  ),
  http.get<{ chatroomid: string }, never, User[]>(
    '/api/chat-rooms/:chatroomid/participants',
    async () => {
      await delay(150);
      return HttpResponse.json([testUser]);
    },
  ),
  http.get<never, never, User[]>('/api/profile/contacts', async () => {
    await delay(150);
    return HttpResponse.json(testContacts);
  }),
  http.post<never, never, string>('/api/profile/contacts', async () => {
    await delay(150);
    return HttpResponse.json('OK');
  }),
  http.delete<{ userid: string }, never, string>(
    '/api/profile/contacts/:userid',
    async () => {
      await delay(150);
      return HttpResponse.json('OK');
    },
  ),
  http.get<never, never, User[]>(
    '/api/profile/contacts/recommended',
    async () => {
      await delay(150);
      return HttpResponse.json(testContacts);
    },
  ),
  http.get<never, never, number>('/api/chat-rooms/page-count', async () => {
    await delay(150);
    return HttpResponse.json(1);
  }),
  http.get<{ chatroomid: string }, never, number>(
    '/api/chat-rooms/:chatroomid/messages/page-count',
    async () => {
      await delay(150);
      return HttpResponse.json(1);
    },
  ),
  http.get<never, never, number>(
    '/api/profile/contacts/page-count',
    async () => {
      await delay(150);
      return HttpResponse.json(1);
    },
  ),
];
