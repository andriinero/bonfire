import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  LegacyRef,
  ReactNode,
  forwardRef,
} from 'react';

import cn from '@/utils/cn';

type TextInputProps = {
  className?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const TextInput = forwardRef(
  (
    { className, ...otherProps }: TextInputProps,
    ref: LegacyRef<HTMLInputElement>,
  ) => {
    return (
      <input
        ref={ref}
        type="text"
        className={cn(
          'rounded-md border border-solid p-2 text-gray-800 shadow-sm transition focus:border-solid focus:border-sky-400 focus:outline-0',
          className,
        )}
        {...otherProps}
      />
    );
  },
);

export default TextInput;
