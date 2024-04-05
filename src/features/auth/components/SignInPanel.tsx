import { FormEvent } from 'react';

import { FaGithub, FaGoogle } from 'react-icons/fa6';
import Form from '../../../components/form/Form';
import InputGroup from '../../../components/form/InputGroup';
import Button from '../../../components/general/Button';
import TextInput from '../../../components/form/TextInput';
import InputLabel from '../../../components/form/InputLabel';

const SignInPanel = () => {
  const handleFormSubmit = (e: FormEvent): void => {
    e.preventDefault();
  };

  return (
    <div className="container space-y-8 rounded-md bg-white p-10 font-medium text-slate-400 shadow">
      <Form onSubmit={handleFormSubmit}>
        <InputGroup>
          <InputLabel htmlFor="sign-in-email">Email address</InputLabel>
          <TextInput name="email" id="sign-in-email" />
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="sign-in-password">Password</InputLabel>
          <TextInput name="password" id="sign-in-password" />
        </InputGroup>
        <Button style="success" type="submit">
          Sign In
        </Button>
      </Form>
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
