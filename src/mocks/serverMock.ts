import { faker } from '@faker-js/faker';
import { HttpResponse, delay, http } from 'msw';

import {
  createRandomUser,
  getAuthDataFromUser,
  createChatRoom,
  getMultipleRandomMessages,
} from '@/utils/test-utils';

import { AuthData } from '@/types/AuthData';
import { ChatRoom } from '@/types/ChatRoom';
import { Message } from '@/types/Message';
import { User } from '@/types/User';

const testUser = createRandomUser();
const testAuthData = getAuthDataFromUser(testUser);
const testChatRoom = createChatRoom();
const testMessages = getMultipleRandomMessages(
  5,
  testChatRoom._id,
  testUser._id,
);
const token = faker.string.uuid();

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
];
