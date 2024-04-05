import { ReactNode } from 'react';

type AuthLabelProps = {
  htmlFor: string;
  children?: ReactNode;
};

const AuthLabel = ({ htmlFor, children }: AuthLabelProps) => {
  return (
    <label className="font-medium text-black" htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default AuthLabel;
