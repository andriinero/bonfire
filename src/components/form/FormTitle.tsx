import cn from '@/utils/cn';
import { ReactNode } from 'react';

type FormTitleProps = {
  children: ReactNode;
  className?: string;
};

const FormTitle = ({ children, className }: FormTitleProps) => {
  return <h2 className={cn('text-xl font-bold', className)}>{children}</h2>;
};

export default FormTitle;
