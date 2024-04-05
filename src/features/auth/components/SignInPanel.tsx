import { FormEvent } from 'react';

import { FaGithub, FaGoogle } from 'react-icons/fa6';
import Form from '../../../components/form/Form';
import InputGroup from '../../../components/form/InputGroup';
import Button from '../../../components/general/Button';
import TextInput from '../../../components/form/TextInput';
import InputLabel from '../../../components/form/InputLabel';
import { useAppDispatch } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';
import { dataInitialized } from '../authSlice';

const SignInPanel = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignInClick = (): void => {
    dispatch(dataInitialized());
    navigate('/home');
  };

  return (
    <div className="container space-y-8 rounded-md bg-white p-10 font-medium text-slate-400 shadow">
      <Form>
        <InputGroup>
          <InputLabel htmlFor="sign-in-email">Email address</InputLabel>
          <TextInput name="email" id="sign-in-email" />
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="sign-in-password">Password</InputLabel>
          <TextInput name="password" id="sign-in-password" />
        </InputGroup>
        <Button onClick={handleSignInClick} style="success" type="submit">
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
