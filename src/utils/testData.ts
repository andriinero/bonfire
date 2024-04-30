import { User } from '@/types/User';
import { faker } from '@faker-js/faker';
import { Message } from '@/types/Message';
import { ChatRoom } from '@/types/ChatRoom';
import { MessageType } from '@/types/MessageType';
import { AuthData } from '@/types/AuthData';

export const createRandomUser = (): User => {
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
  };
};

export const getAuthDataFromUser = (user: User): AuthData => {
  return {
    sub: user._id,
    username: user.username,
    email: user.email,
    role: 'user',
  };
};

export const createChatRoom = (): ChatRoom => {
  return {
    _id: faker.string.uuid(),
    created: faker.date.recent().toISOString(),
  };
};

export const createRandomUserMessage = (
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

export const getMultipleRandomMessages = (
  count: number,
  chatRoomId: string,
  userId: string,
) => {
  const result: Message[] = [];
  for (let i = 0; i < count; i++)
    result.push(createRandomUserMessage(chatRoomId, userId));

  return result;
};
