import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import cn from '@/utils/cn';

type ButtonProps = {
  style?: 'success' | 'hollow';
  className?: string;
  children?: ReactNode;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({
  style = 'success',
  disabled,
  className,
  children,
  ...otherProps
}: ButtonProps) => {
  return (
    <button
      {...otherProps}
      disabled={disabled}
      className={cn(
        'cursor-pointer rounded-md p-2 font-bold text-white shadow-sm transition focus:border-sky-500 focus:outline-0',
        className,
        {
          'pointer-events-none opacity-60 ': disabled,
          'bg-blue bg-sky-500 hover:bg-sky-600': style === 'success',
          'flex justify-center border border-solid p-2 text-slate-500  hover:bg-slate-50':
            style === 'hollow',
        },
      )}
    >
      {children}
    </button>
  );
};

export default Button;
