import { useAppDispatch } from '@/app/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { pushNotificationAdded } from '@/features/pushNotifications/pushNotificationsSlice';
import {
  createContactsModalClosed,
  usePostContactMutation,
} from '../contactsSlice';

import type { ErrorData } from '@/types/ErrorData';
import { PushNotificationType } from '@/types/PushNotification';

import Form from '@/components/form/Form';
import FormTitle from '@/components/form/FormTitle';
import InputGroup from '@/components/form/InputGroup';
import InputLabel from '@/components/form/InputLabel';
import TextInput from '@/components/form/TextInput';
import ValidationError from '@/components/form/ValidationError';
import Button from '@/components/general/Button';

const CreateContactBodySchema = z.object({
  contactUsername: z
    .string()
    .min(3, 'Username must contain at least 3 characters')
    .max(100, 'Username must contain at most 100 characters'),
});
type TCreateContactBody = z.infer<typeof CreateContactBodySchema>;

const CreateContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateContactBody>({
    resolver: zodResolver(CreateContactBodySchema),
  });

  const dispatch = useAppDispatch();
  const [postContact] = usePostContactMutation();

  const handleFormSubmit = async (data: TCreateContactBody): Promise<void> => {
    try {
      await postContact(data).unwrap();
      dispatch(
        pushNotificationAdded({
          body: `Contact '${data.contactUsername}' created`,
          type: PushNotificationType.SUCCESS,
        }),
      );
      dispatch(createContactsModalClosed());
    } catch (err) {
      console.error((err as ErrorData).message);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col items-start gap-4 rounded-md bg-white px-12 py-8 shadow-md"
    >
      <FormTitle>Create Contact</FormTitle>
      <InputGroup>
        <InputLabel htmlFor="create-contact-username">Username</InputLabel>
        <TextInput
          className="min-w-72"
          {...register('contactUsername')}
          id="create-contact-username"
          placeholder="e.g. user01"
        />
        <ValidationError visible={!!errors.contactUsername}>
          {errors.contactUsername?.message}
        </ValidationError>
      </InputGroup>
      <Button className="self-end" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default CreateContactForm;
