import { ReactNode } from 'react';

type AuthInputWrapperProps = { children?: ReactNode };

const InputGroup = ({ children }: AuthInputWrapperProps) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

export default InputGroup;
