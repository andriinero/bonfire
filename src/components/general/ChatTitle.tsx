import { useAppSelector } from '@/app/hooks';
import { useEffect, useState } from 'react';

import cn from '@/utils/cn';

import { selectAuthUserId } from '@/features/auth/authSlice';
import { selectChatRoomById } from '@/features/chatRooms/chatRoomsSlice';
import { selectParticipantsByChatId } from '@/features/participants/participantsSlice';

const MAX_NAMES_IN_TITLE = 2;

type ChatTitleProps = { chatId: string; className?: string };

const ChatTitle = ({ chatId, className }: ChatTitleProps) => {
  const [title, setTitle] = useState<string>();
  const authUserId = useAppSelector(selectAuthUserId);
  const chat = useAppSelector(selectChatRoomById(chatId, 0));
  const chatParticipants = useAppSelector(selectParticipantsByChatId(chatId));

  useEffect(() => {
    if (!chat?.name) {
      if (chatParticipants) {
        const names = chatParticipants
          .filter((p) => p._id !== authUserId)
          .slice(0, MAX_NAMES_IN_TITLE)
          .map((p) => p.username)
          .join(', ');
        const restCount = chatParticipants.length - MAX_NAMES_IN_TITLE;

        const result =
          restCount > 0 ? `${names} and ${restCount} others` : names;
        setTitle(result);
      }
    } else {
      setTitle(chat.name);
    }
  }, [chat, chatParticipants, authUserId]);

  return (
    <h3 className={cn('font-medium text-gray-800', className)}>{title}</h3>
  );
};

export default ChatTitle;
