import type { ComponentProps, LegacyRef } from 'react';
import { forwardRef } from 'react';

import cn from '@/utils/cn';

type TextInputProps = {
  className?: string;
} & ComponentProps<'input'>;

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
          'w-full rounded-md px-2 py-1.5 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-200 transition focus:border-solid focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-amber-500',
          className,
        )}
        {...otherProps}
      />
    );
  },
);

export default TextInput;
