import { FormEventHandler, ReactNode } from 'react';

type AuthFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children?: ReactNode;
};

const AuthForm = ({ onSubmit, children }: AuthFormProps) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default AuthForm;
