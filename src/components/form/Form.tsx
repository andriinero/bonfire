import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from 'react';

import cn from '@/utils/cn';

type AuthFormProps = {
  className?: string;
  children?: ReactNode;
} & DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

const Form = ({ className, children, ...otherProps }: AuthFormProps) => {
  return (
    <form {...otherProps} className={cn('flex flex-col gap-y-3', className)}>
      {children}
    </form>
  );
};

export default Form;
