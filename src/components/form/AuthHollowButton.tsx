import { MouseEventHandler, ReactNode } from 'react';

type AuthHollowButtonProps = {
  value?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
};

const AuthHollowButton = ({
  value = 'Button',
  type = 'button',
  onClick,
  children,
}: AuthHollowButtonProps) => {
  return (
    <button
      className="flex justify-center cursor-pointer rounded-md border border-solid p-2 text-slate-500 shadow-sm transition hover:bg-slate-50 focus:border-solid focus:border-sky-400 focus:outline-0"
      onClick={onClick}
      type={type}
      value={value}
    >
      {children}
    </button>
  );
};

export default AuthHollowButton;
