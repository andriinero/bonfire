import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { usePostSignUpMutation } from '../authSlice';

import Form from '@/components/form/Form';
import InputGroup from '@/components/form/InputGroup';
import ValidationError from '@/components/form/ValidationError';
import AppLink from '@/components/general/AppLink';
import Paths from '@/constants/Paths';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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

  const navigate = useNavigate();
  const [postSignUp, { isLoading }] = usePostSignUpMutation();

  const handleFormSubmit = async (data: TSignUpBody): Promise<void> => {
    await postSignUp(data).unwrap();
    navigate(Paths.Auth.SIGN_IN);
  };

  const isSubmitDisabled = isLoading;

  return (
    <div className="container space-y-8 rounded-md bg-white p-10 text-sm font-medium text-slate-400 sm:shadow">
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputGroup>
          <Label htmlFor="sign-in-username">Username</Label>
          <Input
            {...register('username')}
            id="sign-in-username"
            aria-errormessage="username-error"
          />
          <ValidationError id="username-error" visible={!!errors.username}>
            {errors.username?.message}
          </ValidationError>
        </InputGroup>
        <InputGroup>
          <Label htmlFor="sign-in-email">Email address</Label>
          <Input
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
          <Label htmlFor="sign-in-password">Password</Label>
          <Input
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
          <Label htmlFor="sign-in-confirm-password">Confirm password</Label>
          <Input
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
        <Button disabled={isSubmitDisabled} className="mt-2" type="submit">
          Sign Up
        </Button>
      </Form>
      <div className="space-x-1 text-center">
        <span className="font-normal text-gray-500">
          Already have an account?
        </span>
        <AppLink className="font-bold text-amber-500" to={Paths.Auth.SIGN_IN}>
          Sign in
        </AppLink>
      </div>
    </div>
  );
};

export default SignUpPanel;
