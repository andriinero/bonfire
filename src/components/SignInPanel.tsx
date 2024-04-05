import { FormEvent } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa6';
import AuthForm from './form/AuthForm';
import AuthInputWrapper from './form/AuthInputWrapper';
import AuthLabel from './form/AuthLabel';
import AuthTextInput from './form/AuthTextInput';
import Button from './general/Button';

const SignInPanel = () => {
  const handleFormSubmit = (e: FormEvent): void => {
    e.preventDefault();
  };

  return (
    <div className="container space-y-8 rounded-md bg-white p-10 font-medium text-slate-400 shadow">
      <AuthForm onSubmit={handleFormSubmit}>
        <AuthInputWrapper>
          <AuthLabel htmlFor="sign-in-email">Email address</AuthLabel>
          <AuthTextInput name="email" id="sign-in-email" />
        </AuthInputWrapper>
        <AuthInputWrapper>
          <AuthLabel htmlFor="sign-in-password">Password</AuthLabel>
          <AuthTextInput name="password" id="sign-in-password" />
        </AuthInputWrapper>
        <Button style="success" type="submit">
          Sign In
        </Button>
      </AuthForm>
      <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-x-2">
        <div className="border"></div>
        <p>Or continue with</p>
        <div className="border"></div>
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <Button style="hollow">
          <FaGithub size="1.5rem" />
        </Button>
        <Button style="hollow">
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
