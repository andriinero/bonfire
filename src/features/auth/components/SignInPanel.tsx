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

import { ErrorData } from '@/types/ErrorData';

import Form from '../../../components/form/Form';
import Button from '../../../components/general/Button';
import TextInput from '../../../components/form/TextInput';
import InputLabel from '../../../components/form/InputLabel';
import InputGroup from '../../../components/form/InputGroup';
import ValidationError from '@/components/form/ValidationError';
import { FaGithub, FaGoogle } from 'react-icons/fa6';

const SignInBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type TSignInBody = z.infer<typeof SignInBodySchema>;

const SignInPanel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInBody>({ resolver: zodResolver(SignInBodySchema) });

  const { refetch, isSuccess } = useGetAuthDataQuery();
  const [postLogin, { isLoading }] = usePostSignInMutation();

  const dispatch = useAppDispatch();

  if (isSuccess) return <Navigate to="/home" />;

  const handleFormSubmit = async (data: TSignInBody): Promise<void> => {
    try {
      const response = await postLogin(data).unwrap();
      if (response) {
        dispatch(tokenInitialized(response.token));
        refetch();
      }
    } catch (err) {
      console.error((err as ErrorData).message);
    }
  };

  const isSubmitDisabled = isLoading;

  return (
    <div className="container space-y-8 rounded-md bg-white p-10 font-medium text-slate-400 shadow">
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputGroup>
          <InputLabel htmlFor="sign-in-email">Email address</InputLabel>
          <TextInput id="sign-in-email" {...register('email')} />
          <ValidationError visible={!!errors.email}>
            {errors.email?.message}
          </ValidationError>
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="sign-in-password">Password</InputLabel>
          <TextInput
            {...register('password')}
            id="sign-in-password"
            type="password"
          />
          <ValidationError visible={!!errors.password}>
            {errors.password?.message}
          </ValidationError>
        </InputGroup>
        <Button disabled={isSubmitDisabled} style="primary" type="submit">
          Sign In
        </Button>
      </Form>
      <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-x-2">
        <div className="border"></div>
        <p>Or continue with</p>
        <div className="border"></div>
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <Button type="button" style="hollow">
          <FaGithub size="1.5rem" />
        </Button>
        <Button type="button" style="hollow">
          <FaGoogle size="1.5rem" />
        </Button>
      </div>
      <div className="space-x-2 text-center">
        <span>New to Bonfire?</span>
        <a
          className="underline decoration-1 underline-offset-1"
          href="/auth/sign-up"
        >
          Create an account
        </a>
      </div>
    </div>
  );
};

export default SignInPanel;
