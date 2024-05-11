import { faker } from '@faker-js/faker';
import { HttpResponse, delay, http } from 'msw';

import {
  createRandomUser,
  getAuthDataFromUser,
  createChatRoom,
  getMultipleRandomMessages,
} from '@/utils/testData';

import type { AuthData } from '@/types/AuthData';
import type { ChatRoom } from '@/types/ChatRoom';
import type { Message } from '@/types/Message';
import type { User } from '@/types/User';

const testUser = createRandomUser(),
  testAuthData = getAuthDataFromUser(testUser),
  testChatRoom = createChatRoom(),
  testMessages = getMultipleRandomMessages(5, testChatRoom._id, testUser._id),
  token = faker.string.uuid();

export const mockDBData = {
  testUser,
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
  http.get<never, never, Message[]>(
    '/api/chat-rooms/:chatroomid/messages',
    async () => {
      await delay(150);
      return HttpResponse.json(testMessages);
    },
  ),
  http.get<never, never, User[]>(
    '/api/chat-rooms/:chatroomid/participants',
    async () => {
      await delay(150);
      return HttpResponse.json([testUser]);
    },
  ),
  http.get<never, never, User[]>('/api/profile/contacts', async () => {
    await delay(150);
    return HttpResponse.json([testUser]);
  }),
  http.delete<never, never, string>(
    '/api/profile/contacts/:userid',
    async () => {
      return HttpResponse.json('OK');
    },
  ),
];
