import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';

import cn from '@/utils/cn';

type TextInputProps = {
  className?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const TextInput = ({ className, ...otherProps }: TextInputProps) => {
  return (
    <input
      {...otherProps}
      type="text"
      className={cn(
        'rounded-md border border-solid p-2 text-black shadow-sm transition focus:border-solid focus:border-sky-400 focus:outline-0',
        className,
      )}
    />
  );
};

export default TextInput;
