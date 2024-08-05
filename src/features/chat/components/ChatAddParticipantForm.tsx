import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { addParticipantFormClosed } from '@/features/drawer/drawerSlice';
import { usePostParticipantMutation } from '@/features/participants/participantsSlice';
import { selectSelectedChatId } from '../chatSlice';

import type { MouseEventHandler } from 'react';

import Form from '@/components/form/Form';
import FormTitle from '@/components/form/FormTitle';
import InputLabel from '@/components/form/InputLabel';
import TextInput from '@/components/form/TextInput';
import ValidationError from '@/components/form/ValidationError';
import Button from '@/components/general/Button';
import IconButton from '@/components/general/IconButton';
import XIcon from '@/components/general/XIcon';

const AddParticipantSchema = z.object({
  participantUsername: z
    .string()
    .min(3, 'Username must contain at least 3 characters')
    .max(100, 'Username must contain at most 100 characters'),
});
type TAddParticipantBody = z.infer<typeof AddParticipantSchema>;

type ChatAddParticipantFormProps = { onCloseClick: MouseEventHandler };

const ChatAddParticipantForm = ({
  onCloseClick,
}: ChatAddParticipantFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isLoading, isDirty },
  } = useForm<TAddParticipantBody>({
    resolver: zodResolver(AddParticipantSchema),
  });

  const selectedChatId = useAppSelector(selectSelectedChatId)!;
  const [postParticipant] = usePostParticipantMutation();
  const dispatch = useAppDispatch();

  const handleFormSubmit = async (data: TAddParticipantBody): Promise<void> => {
    await postParticipant({
      chatRoomId: selectedChatId,
      body: data,
    }).unwrap();
    dispatch(addParticipantFormClosed());
  };

  const isSubmitDisabled = isLoading || !isDirty;

  return (
    <Form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col items-start gap-4 rounded-md bg-white p-8 shadow-md"
    >
      <FormTitle className="flex w-full items-center justify-between">
        <span>Add participant</span>
        <IconButton
          aria-label="Close Form"
          onClick={onCloseClick}
          className="p-0"
        >
          <XIcon />
        </IconButton>
      </FormTitle>
      <InputLabel htmlFor="create-participant-username">
        Enter participant username
      </InputLabel>
      <TextInput
        className="min-w-72"
        {...register('participantUsername')}
        id="add-participant-username"
        placeholder="e.g. user01"
      />
      {errors.participantUsername && (
        <ValidationError visible={!!errors.participantUsername}>
          {errors.participantUsername?.message}
        </ValidationError>
      )}
      <Button disabled={isSubmitDisabled} className="w-full" type="submit">
        Add
      </Button>
    </Form>
  );
};

export default ChatAddParticipantForm;
