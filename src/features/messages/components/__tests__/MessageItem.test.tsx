import { render, screen } from '@testing-library/react';

import type { Message } from '@/types/Message';
import { MessageType } from '@/types/MessageType';

import MessageItem from '../MessageItem';

const testMessage: Message = {
  id: 'm01',
  chatRoomId: 'johnchat01',
  body: 'Chat room created',
  user: {
    id: '01',
    username: 'John',
    isOnline: false,
    colorClass: '',
    profileImage: '',
  },
  created: new Date().toJSON(),
  reply: null,
  type: MessageType.ACTION,
};

const useSelectMessage = vi.hoisted(() => vi.fn());
vi.mock('@/app/hooks', () => ({
  useAppSelector: useSelectMessage,
}));

it('renders message item', () => {
  useSelectMessage.mockReturnValueOnce(testMessage);
  render(<MessageItem chatRoomId="chat01" page={0} id="message01" />);

  const message = screen.getByText('chat room created', { exact: false });

  expect(message).toBeInTheDocument();
});

it('renders empty message item', () => {
  useSelectMessage.mockReturnValueOnce(undefined);
  render(<MessageItem chatRoomId="chat01" page={0} id="message01" />);

  const message = screen.getByText("couldn't be loaded", { exact: false });

  expect(message).toBeInTheDocument();
});
