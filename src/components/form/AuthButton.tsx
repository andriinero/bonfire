import { MouseEventHandler, ReactNode } from 'react';

type AuthButtonProps = {
  value?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
};

const AuthButton = ({
  value = 'Button',
  type = 'button',
  onClick,
  children,
}: AuthButtonProps) => {
  return (
    <button
      className="bg-blue cursor-pointer rounded-md bg-sky-500 p-2 font-bold text-white transition hover:bg-sky-600"
      onClick={onClick}
      type={type}
      value={value}
    >
      {children}
    </button>
  );
};

export default AuthButton;
