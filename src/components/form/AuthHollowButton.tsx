import { MouseEventHandler } from 'react';

type AuthHollowButtonProps = {
  value?: string;
  type?: string;
  onClick?: MouseEventHandler<HTMLInputElement>;
};

const AuthHollowButton = ({
  value = 'Button',
  type = 'button',
  onClick,
}: AuthHollowButtonProps) => {
  return (
    <input
      className="hover:bg-slate-50 transition rounded-md border border-solid p-2 text-slate-500 shadow-sm focus:border-solid focus:border-sky-400 focus:outline-0"
      onClick={onClick}
      type={type}
      value={value}
    />
  );
};

export default AuthHollowButton;
