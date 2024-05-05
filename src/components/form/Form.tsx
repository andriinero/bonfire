import {
  ComponentProps,
  ReactNode,
} from 'react';

import cn from '@/utils/cn';

type FormProps = {
  className?: string;
  children?: ReactNode;
} & ComponentProps<'form'>;

const Form = ({ className, children, ...otherProps }: FormProps) => {
  return (
    <form
      aria-label="form"
      {...otherProps}
      className={cn('flex flex-col gap-y-2', className)}
    >
      {children}
    </form>
  );
};

export default Form;
