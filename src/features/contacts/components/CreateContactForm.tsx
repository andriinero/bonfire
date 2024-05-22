import { useAppDispatch } from '@/app/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { pushNotificationAdded } from '@/features/pushNotifications/pushNotificationsSlice';
import {
  createContactsModalClosed,
  usePostContactMutation,
} from '../contactsSlice';

import { PushNotificationType } from '@/types/PushNotification';

import Form from '@/components/form/Form';
import FormTitle from '@/components/form/FormTitle';
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
      console.error(err);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col items-start gap-4 rounded-md bg-white p-8 shadow-md"
    >
      <FormTitle>Create contact</FormTitle>
      <InputLabel htmlFor="create-contact-username">
        Enter contact username
      </InputLabel>
      <TextInput
        className="min-w-72"
        {...register('contactUsername')}
        id="create-contact-username"
        placeholder="e.g. user01"
      />
      {errors.contactUsername && (
        <ValidationError visible={!!errors.contactUsername}>
          {errors.contactUsername?.message}
        </ValidationError>
      )}
      <Button className="w-full" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default CreateContactForm;
