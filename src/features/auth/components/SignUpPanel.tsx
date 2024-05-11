import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { usePostSignUpMutation } from '../authSlice';

import type { ErrorData } from '@/types/ErrorData';

import Form from '@/components/form/Form';
import InputGroup from '@/components/form/InputGroup';
import InputLabel from '@/components/form/InputLabel';
import TextInput from '@/components/form/TextInput';
import ValidationError from '@/components/form/ValidationError';
import Button from '@/components/general/Button';
import AppLink from '@/components/general/AppLink';
import Paths from '@/constants/Paths';
import ErrorNotification from '@/features/pushNotifications/components/ErrorNotification';

const SignUpBodySchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must contain at least 3 characters')
      .max(100, 'Username must contain at most 8 characters'),
    email: z
      .string()
      .min(3, 'Email must contain at least 3 characters')
      .max(100, 'Email must contain at most 8 characters'),
    password: z.string().min(8, 'Password must contain at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
export type TSignUpBody = z.infer<typeof SignUpBodySchema>;

const SignUpPanel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpBody>({ resolver: zodResolver(SignUpBodySchema) });

  const [postSignUp, { isLoading, isError, error }] = usePostSignUpMutation();

  const handleFormSubmit = async (data: TSignUpBody): Promise<void> => {
    try {
      await postSignUp(data).unwrap();
    } catch (err) {
      console.error(err as ErrorData);
    }
  };

  const isSubmitDisabled = isLoading;

  return (
    <div className="container space-y-8 rounded-md bg-white p-10 text-sm font-medium text-slate-400 shadow">
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputGroup>
          <InputLabel htmlFor="sign-in-username">Username</InputLabel>
          <TextInput
            {...register('username')}
            id="sign-in-username"
            aria-errormessage="username-error"
          />
          <ValidationError id="username-error" visible={!!errors.username}>
            {errors.username?.message}
          </ValidationError>
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="sign-in-email">Email address</InputLabel>
          <TextInput
            {...register('email')}
            id="sign-in-email"
            type="email"
            aria-errormessage="email-error"
          />
          <ValidationError id="email-error" visible={!!errors.email}>
            {errors.email?.message}
          </ValidationError>
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="sign-in-password">Password</InputLabel>
          <TextInput
            {...register('password')}
            id="sign-in-password"
            type="password"
            aria-errormessage="password-error"
          />
          <ValidationError id="password-error" visible={!!errors.password}>
            {errors.password?.message}
          </ValidationError>
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="sign-in-confirm-password">
            Confirm password
          </InputLabel>
          <TextInput
            {...register('confirmPassword')}
            id="sign-in-confirm-password"
            type="password"
            aria-errormessage="confirm-password-error"
          />
          <ValidationError
            id="confirm-password-error"
            visible={!!errors.confirmPassword}
          >
            {errors.confirmPassword?.message}
          </ValidationError>
        </InputGroup>
        <Button
          disabled={isSubmitDisabled}
          className="mt-2"
          style="primary"
          type="submit"
        >
          Sign Up
        </Button>
      </Form>
      {isError && <ErrorNotification error={error} />}
      <div className="space-x-1 text-center">
        <span className="font-normal text-gray-500">
          Already have an account?
        </span>
        <AppLink className="font-bold text-sky-600" to={Paths.Auth.SIGN_IN}>
          Sign in
        </AppLink>
      </div>
    </div>
  );
};

export default SignUpPanel;
