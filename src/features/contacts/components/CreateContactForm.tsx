import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { usePostContactMutation } from '../contactsSlice';

import type { MouseEventHandler } from 'react';

import Form from '@/components/form/Form';
import InputGroup from '@/components/form/InputGroup';
import InputLabel from '@/components/form/InputLabel';
import TextInput from '@/components/form/TextInput';
import ValidationError from '@/components/form/ValidationError';
import Button from '@/components/general/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
    <Card>
      <CardHeader>
        <CardTitle>
          <span>Create contact</span>
        </CardTitle>
        <CardDescription>Enter contact username</CardDescription>
      </CardHeader>
      <CardContent>
        <Form
          id="create-contact-form"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <InputGroup>
            <InputLabel htmlFor="create-contact-username">Username</InputLabel>
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
        </Form>
      </CardContent>
      <CardFooter className="justify-end gap-4">
        <Button aria-label="Close Form" onClick={onCloseClick} style="hollow">
          Cancel
        </Button>
        <Button type="submit" form="create-contact-form">
          Create
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateContactForm;
