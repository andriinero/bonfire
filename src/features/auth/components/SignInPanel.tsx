import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormEvent } from 'react';

import {
  authDataFetched,
  selectSignInPostedState,
  signInPosted,
} from '../authSlice';

import { FaGithub, FaGoogle } from 'react-icons/fa6';
import Form from '../../../components/form/Form';
import InputGroup from '../../../components/form/InputGroup';
import Button from '../../../components/general/Button';
import TextInput from '../../../components/form/TextInput';
import InputLabel from '../../../components/form/InputLabel';
import ValidationError from '@/components/form/ValidationError';

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type TSignIn = z.infer<typeof SignInSchema>;

const SignInPanel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignIn>({ resolver: zodResolver(SignInSchema) });

  const signInState = useAppSelector(selectSignInPostedState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (data: TSignIn) => {
    dispatch(signInPosted(data)).then(() => {
      dispatch(authDataFetched()).then(() => {
        navigate('/home');
      });
    });
  };

  const isSubmitDisabled = signInState === 'loading';

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
        <Button disabled={isSubmitDisabled} style="success" type="submit">
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
