import { ReactNode } from 'react';

type InputGroupProps = { children?: ReactNode };

const InputGroup = ({ children }: InputGroupProps) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

export default InputGroup;
