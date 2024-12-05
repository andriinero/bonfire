import { faker } from '@faker-js/faker';

import type { AuthData } from '@/types/AuthData';
import type { ChatRoom } from '@/types/ChatRoom';
import type { Message, MessageAuthor } from '@/types/Message';
import { MessageType } from '@/types/MessageType';
import type { User } from '@/types/User';

const createRandomUser = (): User => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = faker.internet.userName({ firstName, lastName });
  const email = faker.internet.email({ firstName, lastName });

  return {
    id: faker.string.uuid(),
    username,
    email,
    role: 'user',
    created: faker.date.recent().toISOString(),
    isOnline: faker.helpers.arrayElement<boolean>([true, false]),
    profileImage: faker.image.avatar(),
    colorClass: 'sky-400',
  };
};

const getAuthDataFromUser = (user: User): AuthData => {
  return {
    sub: user.id,
    username: user.username,
    email: user.email,
    role: 'user',
    colorClass: 'sky-400',
  };
};

const createChatRoom = (): ChatRoom => {
  return {
    id: faker.string.uuid(),
    created: faker.date.recent().toISOString(),
    colorClass: 'amber-400',
  };
};

const createRandomUserMessage = (
  chatRoomId: string,
  user: MessageAuthor,
): Message => {
  return {
    id: faker.string.uuid(),
    chatRoomId,
    user,
    body: faker.lorem.sentence(),
    created: faker.date.recent().toISOString(),
    reply: null,
    type: MessageType.MESSAGE,
  };
};

const getMultipleRandomMessages = (
  count: number,
  chatRoomId: string,
  user: MessageAuthor,
) => {
  const result: Message[] = [];
  for (let i = 0; i < count; i++)
    result.push(createRandomUserMessage(chatRoomId, user));

  return result;
};

const getMultipleRandomUsers = (count: number) => {
  const result: User[] = [];
  for (let i = 0; i < count; i++) result.push(createRandomUser());

  return result;
};

export default {
  createRandomUser,
  getAuthDataFromUser,
  createChatRoom,
  createRandomUserMessage,
  getMultipleRandomMessages,
  getMultipleRandomUsers,
} as const;
