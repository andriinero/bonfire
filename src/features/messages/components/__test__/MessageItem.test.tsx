import { render, screen } from '@testing-library/react';
import MessageItem from '../MessageItem';
import { MessageType } from '@/types/MessageType';
import { MessageData } from '@/types/MessageData';

const testMessage: MessageData = {
  _id: 'm01',
  chat_room: 'johnchat01',
  body: 'Chat room created',
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
  render(<MessageItem chatRoomId="chat01" messageId="message01" />);

  const message = screen.getByText('chat room created', { exact: false });

  expect(message).toBeInTheDocument();
});

it('renders empty message item', () => {
  useSelectMessage.mockReturnValueOnce(undefined);
  render(<MessageItem chatRoomId="chat01" messageId="message01" />);

  const message = screen.getByText("couldn't be loaded", { exact: false });

  expect(message).toBeInTheDocument();
});
