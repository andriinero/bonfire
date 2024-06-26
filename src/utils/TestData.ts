import { faker } from '@faker-js/faker';

import type { AuthData } from '@/types/AuthData';
import type { ChatRoom } from '@/types/ChatRoom';
import type { Message } from '@/types/Message';
import { MessageType } from '@/types/MessageType';
import type { User } from '@/types/User';

const createRandomUser = (): User => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = faker.internet.userName({ firstName, lastName });
  const email = faker.internet.email({ firstName, lastName });

  return {
    _id: faker.string.uuid(),
    username,
    email,
    role: 'user',
    created: faker.date.recent().toISOString(),
    is_online: faker.helpers.arrayElement<boolean>([true, false]),
    profile_image: faker.image.avatar(),
    color_class: 'sky-400',
  };
};

const getAuthDataFromUser = (user: User): AuthData => {
  return {
    sub: user._id,
    username: user.username,
    email: user.email,
    role: 'user',
    color_class: 'sky-400',
  };
};

const createChatRoom = (): ChatRoom => {
  return {
    _id: faker.string.uuid(),
    created: faker.date.recent().toISOString(),
    color_class: 'amber-400',
  };
};

const createRandomUserMessage = (
  chatRoomId: string,
  userId: string,
): Message => {
  return {
    _id: faker.string.uuid(),
    chat_room: chatRoomId,
    user: userId,
    body: faker.lorem.sentence(),
    created: faker.date.recent().toISOString(),
    reply: null,
    type: MessageType.MESSAGE,
  };
};

const getMultipleRandomMessages = (
  count: number,
  chatRoomId: string,
  userId: string,
) => {
  const result: Message[] = [];
  for (let i = 0; i < count; i++)
    result.push(createRandomUserMessage(chatRoomId, userId));

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
