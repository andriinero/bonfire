import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { messageSent } from '@/features/socket/socketSlice';
import { selectSelectedChatId } from '../chatSlice';

import type { TPostMessageBody } from '@/features/messages/messagesSlice';

import { Button } from '@/components/ui/button';
import { Send, ThumbsUp } from 'lucide-react';
import { Input } from '@/components/ui/input';

const MessageBarSchema = z.object({
  body: z.string().min(1, 'Message must contain at least one character'),
});

type TMessageBar = z.infer<typeof MessageBarSchema>;

const ChatMessageInput = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
  } = useForm<TMessageBar>({ resolver: zodResolver(MessageBarSchema) });

  const selectedChatId = useAppSelector(selectSelectedChatId);

  const dispatch = useAppDispatch();

  const handleSendMessage = async (data: TMessageBar) => {
    if (!selectedChatId) return;

    const postBody: TPostMessageBody = {
      chatRoomId: selectedChatId,
      body: data.body,
    };
    dispatch(messageSent(postBody));
    reset();
  };

  const handleSendThumbsUp = async () => {
    if (!selectedChatId) return;
    dispatch(messageSent({ chatRoomId: selectedChatId, body: '👍' }));
    reset();
  };

  return (
    <div className="flex gap-2 border-t px-4 py-2">
      <form onSubmit={handleSubmit(handleSendMessage)} className="flex-1">
        <Input
          {...register('body')}
          className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-gray-950 outline-0 ring-0"
          type="text"
          placeholder="Write a message..."
        />
      </form>
      <Button
        onClick={handleSendThumbsUp}
        className="cursor-pointer rounded-full text-amber-500 transition"
        variant="ghost"
        size="icon"
      >
        <ThumbsUp />
      </Button>
    </div>
  );
};

export default ChatMessageInput;
