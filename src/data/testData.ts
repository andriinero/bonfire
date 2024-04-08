import { v4 as uuid } from 'uuid';

import { MessageData } from '@/types/MessageData';
import { UserData } from '@/types/UserData';
import { MessageType } from '@/types/MessageType';

export const testParticipant: UserData = {
  _id: 'user0',
  username: 'John',
  email: 'john@gmail.com',
  role: 'user',
  created: new Date().toISOString(),
  is_online: true,
  profile_image:
    'https://img.freepik.com/premium-photo/profile-picture-happy-young-caucasian-man-spectacles-show-confidence-leadership-headshot-portrait-smiling-millennial-male-glasses-posing-indoors-home-employment-success-concept_774935-1446.jpg',
};

export const testParticipantsList: UserData[] = [
  {
    _id: 'john01',
    username: 'John',
    email: 'john@gmail.com',
    role: 'user',
    created: new Date().toISOString(),
    is_online: false,
    profile_image: '/profile-placeholder.jpeg',
  },
  {
    _id: 'kate01',
    username: 'Kate',
    email: 'john@gmail.com',
    role: 'user',
    created: new Date().toISOString(),
    is_online: false,
    profile_image: '/profile-placeholder.jpeg',
  },
  {
    _id: 'max01',
    username: 'Max',
    email: 'john@gmail.com',
    role: 'user',
    created: new Date().toISOString(),
    is_online: false,
    profile_image: '/profile-placeholder.jpeg',
  },
  {
    _id: '6611abec2542ae6c079f6e18',
    username: 'Sarah',
    email: 'sarah@gmail.com',
    role: 'user',
    created: new Date().toISOString(),
    is_online: true,
    profile_image: '/profile-placeholder.jpeg',
  },
];

export const testMessages: MessageData[] = [
  {
    _id: 'm03',
    user: 'john01',
    chat_room: 'johnchat01',
    body: 'Another test message!',
    created: new Date().toJSON(),
    reply: null,
    type: MessageType.MESSAGE,
  },
  {
    _id: 'm02',
    user: 'john01',
    chat_room: 'johnchat01',
    body: 'Hey! This is a test message.',
    created: new Date().toJSON(),
    reply: null,
    type: MessageType.MESSAGE,
  },
  {
    _id: 'm01',
    user: null,
    chat_room: 'johnchat01',
    body: 'Chat room created',
    created: new Date().toJSON(),
    reply: null,
    type: MessageType.ACTION,
  },
];
