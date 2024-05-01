import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { usePostSignInMutation } from '../authSlice';

import { FaGithub, FaGoogle } from 'react-icons/fa6';
import Form from '../../../components/form/Form';
import Button from '../../../components/general/Button';
import TextInput from '../../../components/form/TextInput';
import InputLabel from '../../../components/form/InputLabel';
import InputGroup from '../../../components/form/InputGroup';
import ValidationError from '@/components/form/ValidationError';

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

  const [postSignIn, { isLoading, isSuccess }] = usePostSignInMutation();

  if (isSuccess) return <Navigate to="/home/chats" />;

  const handleFormSubmit = async (data: TSignInBody): Promise<void> => {
    await postSignIn(data).unwrap();
  };

  const isSubmitDisabled = isLoading;

  return (
    <div className="container space-y-8 rounded-md bg-white p-10 font-medium text-slate-400 shadow">
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
