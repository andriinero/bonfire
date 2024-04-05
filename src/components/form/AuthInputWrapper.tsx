import { ReactNode } from 'react';

type AuthInputWrapperProps = { children?: ReactNode };

const AuthInputWrapper = ({ children }: AuthInputWrapperProps) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

export default AuthInputWrapper;
