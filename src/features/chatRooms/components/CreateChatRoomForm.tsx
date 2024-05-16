import { useAppDispatch } from '@/app/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { pushNotificationAdded } from '@/features/pushNotifications/pushNotificationsSlice';
import {
  createChatRoomModalClosed,
  usePostChatRoomMutation,
} from '../chatRoomsSlice';

import type { ErrorData } from '@/types/ErrorData';
import { PushNotificationType } from '@/types/PushNotification';

import Form from '@/components/form/Form';
import FormTitle from '@/components/form/FormTitle';
import InputGroup from '@/components/form/InputGroup';
import InputLabel from '@/components/form/InputLabel';
import TextInput from '@/components/form/TextInput';
import ValidationError from '@/components/form/ValidationError';
import Button from '@/components/general/Button';

const CreateChatRoomBodySchema = z.object({
  participantUsername: z
    .string()
    .min(3, 'Username must contain at least 3 characters')
    .max(100, 'Username must contain at most 100 characters'),
});
type TCreateChatBody = z.infer<typeof CreateChatRoomBodySchema>;

const CreateChatRoomForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateChatBody>({
    resolver: zodResolver(CreateChatRoomBodySchema),
  });

  const dispatch = useAppDispatch();
  const [postChatRoom] = usePostChatRoomMutation();

  const handleFormSubmit = async (data: TCreateChatBody): Promise<void> => {
    try {
      await postChatRoom(data).unwrap();
      dispatch(
        pushNotificationAdded({
          body: 'Chat successfully created',
          type: PushNotificationType.SUCCESS,
        }),
      );
      dispatch(createChatRoomModalClosed());
    } catch (err) {
      console.error((err as ErrorData).message);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col items-start gap-4 rounded-md bg-white px-12 py-8 shadow-md"
    >
      <FormTitle>Create Chat</FormTitle>
      <InputGroup>
        <InputLabel htmlFor="create-chat-username">Username</InputLabel>
        <TextInput
          className="min-w-72"
          {...register('participantUsername')}
          id="create-chat-username"
          placeholder="e.g. user01"
        />
        <ValidationError visible={!!errors.participantUsername}>
          {errors.participantUsername?.message}
        </ValidationError>
      </InputGroup>
      <Button className="self-end" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default CreateChatRoomForm;
