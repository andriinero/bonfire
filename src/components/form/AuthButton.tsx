import { MouseEventHandler, ReactNode } from 'react';

type AuthButtonProps = {
  value?: string;
  type?: string;
  onClick?: MouseEventHandler<HTMLInputElement>;
};

const AuthButton = ({
  value = 'Button',
  type = 'button',
  onClick,
}: AuthButtonProps) => {
  return (
    <input
      className="cursor-pointer bg-blue rounded-md bg-sky-500 p-2 font-bold text-white transition hover:bg-sky-600"
      onClick={onClick}
      type={type}
      value={value}
    />
  );
};

export default AuthButton;
