import { useAppSelector } from '@/app/hooks';
import { useEffect, useState } from 'react';

import cn from '@/utils/cn';

import { selectAuthUserId } from '@/features/auth/authSlice';
import { selectChatRoomById } from '@/features/chatRooms/chatRoomsSlice';
import { selectParticipantsByChatId } from '@/features/participants/participantsSlice';

import type { ComponentPropsWithoutRef } from 'react';

const MAX_NAMES_IN_TITLE = 2;

type ChatTitleProps = { chatRoomId: string } & ComponentPropsWithoutRef<'h3'>;

const ChatTitle = ({
  chatRoomId,
  className,
  ...otherProps
}: ChatTitleProps) => {
  const [title, setTitle] = useState<string>();
  const authUserId = useAppSelector(selectAuthUserId);
  const chat = useAppSelector(selectChatRoomById(chatRoomId));
  const chatParticipants = useAppSelector(
    selectParticipantsByChatId(chatRoomId),
  );

  useEffect(() => {
    if (!chat?.name) {
      if (chatParticipants) {
        const names = chatParticipants
          .filter((p) => p.id !== authUserId)
          .slice(0, MAX_NAMES_IN_TITLE)
          .map((p) => p.username)
          .join(', ');
        const restParticipantsCount =
          chatParticipants.length - MAX_NAMES_IN_TITLE;
        const ending = restParticipantsCount > 1 ? 'others' : 'other';
        const result =
          restParticipantsCount > 0
            ? `${names} and ${restParticipantsCount} ${ending}`
            : names;

        setTitle(result);
      }
    } else {
      setTitle(chat.name);
    }
  }, [chat, chatParticipants, authUserId]);

  return (
    <h3
      className={cn('font-semibold text-gray-950', className)}
      {...otherProps}
    >
      {title}
    </h3>
  );
};

export default ChatTitle;
