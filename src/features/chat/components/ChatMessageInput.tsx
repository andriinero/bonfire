import { useAppSelector } from '@/app/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { selectAuthUserId } from '@/features/auth/authSlice';
import { usePostMessageMutation } from '@/features/messages/messagesSlice';
import { selectSelectedChatId } from '../chatSlice';

import type { TPostMessageBody } from '@/features/messages/messagesSlice';

import TextInput from '@/components/form/TextInput';
import Button from '@/components/general/Button';
import { SendHorizontal } from 'lucide-react';

const MessageBarSchema = z.object({
  body: z.string().min(1, 'Message must contain at least one character'),
});

type TMessageBar = z.infer<typeof MessageBarSchema>;

const ChatMessageInput = () => {
  const selectedChatId = useAppSelector(selectSelectedChatId);
  const authUserId = useAppSelector(selectAuthUserId) as string;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
  } = useForm<TMessageBar>({ resolver: zodResolver(MessageBarSchema) });

  const [postMessage, { isLoading }] = usePostMessageMutation();

  const handleFormSubmit = async (data: TMessageBar): Promise<void> => {
    const postBody: TPostMessageBody = { body: data.body, user: authUserId };
    await postMessage({ chatRoomId: selectedChatId!, body: postBody });
    reset();
  };

  const isSubmitDisabled = isSubmitting || isLoading || !isValid;

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
          <SendHorizontal className="text-lg" />
        </Button>
      </form>
    </div>
  );
};

export default ChatMessageInput;
