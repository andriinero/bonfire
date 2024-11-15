import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { usePostContactMutation } from '../contactsSlice';

import type { MouseEventHandler } from 'react';

import Form from '@/components/form/Form';
import FormTitle from '@/components/form/FormTitle';
import InputGroup from '@/components/form/InputGroup';
import InputLabel from '@/components/form/InputLabel';
import TextInput from '@/components/form/TextInput';
import ValidationError from '@/components/form/ValidationError';
import Button from '@/components/general/Button';
import IconButton from '@/components/general/IconButton';
import XIcon from '@/components/general/XIcon';

const CreateContactBodySchema = z.object({
  contactUsername: z
    .string()
    .min(3, 'Username must contain at least 3 characters')
    .max(100, 'Username must contain at most 100 characters'),
});
type TCreateContactBody = z.infer<typeof CreateContactBodySchema>;

type CreateContactFormProps = { onCloseClick: MouseEventHandler };

const CreateContactForm = ({ onCloseClick }: CreateContactFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateContactBody>({
    resolver: zodResolver(CreateContactBodySchema),
  });

  const [postContact] = usePostContactMutation();

  const handleFormSubmit = (data: TCreateContactBody) => {
    postContact(data);
  };

  return (
    <Form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col items-start gap-5 rounded-md bg-white p-8 shadow-md"
    >
      <FormTitle className="flex w-full items-center justify-between">
        <span>Create contact</span>
        <IconButton
          aria-label="Close Form"
          onClick={onCloseClick}
          className="p-0"
        >
          <XIcon />
        </IconButton>
      </FormTitle>
      <InputGroup>
        <InputLabel htmlFor="create-contact-username">
          Enter contact username
        </InputLabel>
        <TextInput
          {...register('contactUsername')}
          className="min-w-72"
          id="create-contact-username"
          placeholder="e.g. user01"
        />
      </InputGroup>
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
