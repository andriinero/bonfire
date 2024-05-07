import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@/components/form/Form';
import InputGroup from '@/components/form/InputGroup';
import InputLabel from '@/components/form/InputLabel';
import TextInput from '@/components/form/TextInput';
import ValidationError from '@/components/form/ValidationError';
import Button from '@/components/general/Button';
import FormTitle from '@/components/form/FormTitle';

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

  const handleFormSubmit = (): void => {};

  return (
    <Form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col items-start gap-4 rounded-md bg-white px-12 py-8 shadow-md"
    >
      <FormTitle>Create Contact</FormTitle>
      <InputGroup>
        <InputLabel htmlFor="create-contact-username">Something</InputLabel>
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
