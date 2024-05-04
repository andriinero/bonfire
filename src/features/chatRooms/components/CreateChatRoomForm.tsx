import { z } from 'zod';
import { useForm } from 'react-hook-form';

import Form from '@/components/form/Form';
import InputGroup from '@/components/form/InputGroup';
import InputLabel from '@/components/form/InputLabel';
import TextInput from '@/components/form/TextInput';
import ValidationError from '@/components/form/ValidationError';
import Button from '@/components/general/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostChatRoomMutation } from '../chatRoomsSlice';
import { ErrorData } from '@/types/ErrorData';

const CreateChatBodySchema = z.object({
  username: z
    .string()
    .min(3, 'Username must contain at least 3 characters')
    .max(100, 'Username must contain at most 100 characters'),
});
type TCreateChatBody = z.infer<typeof CreateChatBodySchema>;

const CreateChatRoomForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateChatBody>({ resolver: zodResolver(CreateChatBodySchema) });

  const [postChatRoom] = usePostChatRoomMutation();

  const handleFormSubmit = async (data: TCreateChatBody): Promise<void> => {
    try {
      await postChatRoom(data).unwrap();
    } catch (err) {
      console.error((err as ErrorData).message);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col items-start gap-4 rounded-md bg-white px-12 py-8 shadow-md"
    >
      <h2 className="text-xl font-bold">Create Chat</h2>
      <InputGroup>
        <InputLabel htmlFor="create-chat-username">Username</InputLabel>
        <TextInput
          className="min-w-72"
          {...register('username')}
          id="create-chat-username"
          placeholder="e.g. user01"
        />
        <ValidationError visible={!!errors.username}>
          {errors.username?.message}
        </ValidationError>
      </InputGroup>
      <Button className="self-end" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default CreateChatRoomForm;