import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { messageSent } from '@/features/socket/socketSlice';
import { selectSelectedChatId } from '../chatSlice';

import type { TPostMessageBody } from '@/features/messages/messagesSlice';

import TextInput from '@/components/form/TextInput';
import Button from '@/components/general/Button';
import { Send } from 'lucide-react';

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

  const handleFormSubmit = async (data: TMessageBar): Promise<void> => {
    if (!selectedChatId) return;

    const postBody: TPostMessageBody = {
      chatRoomId: selectedChatId,
      body: data.body,
    };
    dispatch(messageSent(postBody));
    reset();
  };

  const isSubmitDisabled = isSubmitting || !isValid;

  return (
    <div className="border-t px-4 py-2">
      <form
        className="flex items-center gap-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <TextInput
          {...register('body')}
          className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-gray-800 outline-0 ring-0"
          type="text"
          placeholder="Write a message..."
        />
        <Button
          disabled={isSubmitDisabled}
          style="primary"
          type="submit"
          className="cursor-pointer rounded-full p-2 text-white transition"
        >
          <Send className="text-lg" />
        </Button>
      </form>
    </div>
  );
};

export default ChatMessageInput;
