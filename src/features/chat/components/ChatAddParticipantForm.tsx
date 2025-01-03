import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { addParticipantFormClosed } from '@/features/drawer/drawerSlice';
import { usePostParticipantMutation } from '@/features/participants/participantsSlice';
import { selectSelectedChatId } from '../chatSlice';

import type { MouseEventHandler } from 'react';

import Form from '@/components/form/Form';
import InputGroup from '@/components/form/InputGroup';
import ValidationError from '@/components/form/ValidationError';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
    <Card>
      <CardHeader>
        <CardTitle>Add participant</CardTitle>
        <CardDescription>Enter contact username</CardDescription>
      </CardHeader>
      <CardContent>
        <Form id="add-participant" onSubmit={handleSubmit(handleFormSubmit)}>
          <InputGroup>
            <Label htmlFor="add-participant">Username</Label>
            <Input
              className="min-w-72"
              {...register('participantUsername')}
              id="add-participant-username"
              placeholder="e.g. user01"
            />
          </InputGroup>
          {errors.participantUsername && (
            <ValidationError visible={!!errors.participantUsername}>
              {errors.participantUsername?.message}
            </ValidationError>
          )}
        </Form>
      </CardContent>
      <CardFooter className="justify-end gap-4">
        <Button aria-label="Close Form" onClick={onCloseClick} variant="ghost">
          Cancel
        </Button>
        <Button
          disabled={isSubmitDisabled}
          type="submit"
          form="add-participant"
        >
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChatAddParticipantForm;
