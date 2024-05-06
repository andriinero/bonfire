import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/app/hooks';

import {
  tokenInitialized,
  useGetAuthDataQuery,
  usePostSignInMutation,
} from '../authSlice';

import { FaGoogle } from 'react-icons/fa6';
import Form from '../../../components/form/Form';
import Button from '../../../components/general/Button';
import TextInput from '../../../components/form/TextInput';
import InputLabel from '../../../components/form/InputLabel';
import InputGroup from '../../../components/form/InputGroup';
import ValidationError from '@/components/form/ValidationError';
import UserIcon from '@/components/general/UserIcon';
import AppLink from '@/components/general/AppLink';
import Paths from '@/constants/Paths';
import ServerErrorMessage from '@/components/form/ServerErrorMessage';

const SignInBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type TSignInBody = z.infer<typeof SignInBodySchema>;

const SignInPanel = () => {
  const { refetch } = useGetAuthDataQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInBody>({ resolver: zodResolver(SignInBodySchema) });

  const [postSignIn, { isLoading, isSuccess, isError, error }] =
    usePostSignInMutation();

  const dispatch = useAppDispatch();

  if (isSuccess) return <Navigate to="/home/chats" />;

  const handleFormSubmit = async (data: TSignInBody): Promise<void> => {
    try {
      const result = await postSignIn(data).unwrap();
      dispatch(tokenInitialized(result.token));
      refetch();
    } catch (err) {}
  };

  const handleGuestSignIn = async (): Promise<void> => {
    try {
      const result = await postSignIn({
        email: 'max@gmail.com',
        password: 'strongpass1',
      }).unwrap();
      dispatch(tokenInitialized(result.token));
      refetch();
    } catch (err) {}
  };

  const isSubmitDisabled = isLoading;

  return (
    <div className="container space-y-8 rounded-md bg-white p-12 text-sm font-medium text-gray-900 shadow">
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputGroup>
          <InputLabel htmlFor="sign-in-email">Email address</InputLabel>
          <TextInput
            {...register('email')}
            id="sign-in-email"
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
        <Button disabled={isSubmitDisabled} style="primary" type="submit">
          Sign In
        </Button>
      </Form>
      {isError && <ServerErrorMessage error={error} />}
      <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-x-8">
        <div className="border-b"></div>
        <p>Or continue with</p>
        <div className="border-b"></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button disabled className="space-x-3" type="button" style="hollow">
          <img
            src="/google-logo.png"
            alt="Google Icon"
            className="size-5 self-center"
          />
          <span>Google</span>
        </Button>
        <Button
          className="flex gap-2 p-0 font-semibold "
          type="button"
          style="hollow"
          onClick={handleGuestSignIn}
        >
          <UserIcon isOnline={false} src="/guest.png" style="xs" />
          <p className="text-gray-900">Guest</p>
        </Button>
      </div>
      <div className="space-x-2 text-center">
        <span className="font-normal text-gray-500">New to Bonfire?</span>
        <AppLink className="font-bold text-sky-600" to={Paths.Auth.SIGN_UP}>
          Create an account
        </AppLink>
      </div>
    </div>
  );
};

export default SignInPanel;
