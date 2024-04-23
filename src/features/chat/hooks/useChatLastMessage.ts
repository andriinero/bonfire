import { useAppSelector } from '@/app/hooks';

import { selectMessagesByChatId } from '@/features/messages/messagesSlice';

const useChatLastMessage = (chatId: string) => {
  const messages = useAppSelector(selectMessagesByChatId(chatId));

  return messages ? messages[messages.length - 1] : undefined;
};

export default useChatLastMessage;
