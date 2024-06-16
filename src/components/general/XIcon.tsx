import cn from '@/utils/cn';

import type { ComponentPropsWithoutRef } from 'react';

import { X } from 'lucide-react';

type CrossIconProps = ComponentPropsWithoutRef<'svg'>;

const XIcon = ({ className, ...otherProps }: CrossIconProps) => {
  return <X className={cn('text-base', className)} {...otherProps} />;
};

export default XIcon;
