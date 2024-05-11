import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

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
        'flex cursor-pointer justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white transition focus:border-sky-500 focus:outline-0',
        className,
        {
          'pointer-events-none opacity-60 ': disabled,
          'bg-blue bg-sky-500 shadow-sm hover:bg-sky-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-sky-500':
            style === 'primary',
          'p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-sky-500':
            style === 'hollow',
        },
      )}
    >
      {children}
    </button>
  );
};

export default Button;
