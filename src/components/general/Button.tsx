import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import cn from '@/utils/cn';

type ButtonProps = {
  style?: 'primary' | 'hollow';
  className?: string;
  children?: ReactNode;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({
  style = 'primary',
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
        'cursor-pointer rounded-md px-4 py-2 font-bold text-white transition focus:border-sky-500 focus:outline-0',
        className,
        {
          'pointer-events-none opacity-60 ': disabled,
          'bg-blue bg-sky-500 shadow-sm hover:bg-sky-600 ': style === 'primary',
          'flex justify-center border border-solid p-2 text-gray-500 shadow-sm hover:bg-gray-50':
            style === 'hollow',
        },
      )}
    >
      {children}
    </button>
  );
};

export default Button;
