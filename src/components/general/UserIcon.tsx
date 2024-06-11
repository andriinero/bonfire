import cn from '@/utils/cn';

import type { ComponentProps } from 'react';

import FallbackIcon from './FallbackIcon';

type UserIconProps = {
  title?: string;
  colorClass?: string;
  isOnline?: boolean;
  style?: 'xs' | 'md' | 'lg' | 'xl';
} & ComponentProps<'img'>;

const UserIcon = ({
  className,
  title = '?',
  colorClass = 'amber-400',
  src,
  isOnline = false,
  style = 'md',
  ...otherProps
}: UserIconProps) => {
  return (
    <div className="relative">
      <div
        className={cn(
          'invisible absolute ml-6 size-4 shrink-0 select-none rounded-full border-2 border-white bg-green-400',
          className,
          { visible: isOnline },
          { 'ml-8': style === 'lg' },
          { 'ml-14 size-5': style === 'xl' },
        )}
      />
      {src ? (
        <img
          src={src}
          className={cn(
            'select-none rounded-full object-cover text-gray-400',
            className,
            {
              'size-6': style === 'xs',
              'size-10': style === 'md',
              'size-12': style === 'lg',
              'size-20': style === 'xl',
            },
          )}
          alt="User Icon"
          {...otherProps}
        />
      ) : (
        <FallbackIcon
          className={className}
          title={title}
          colorClass={colorClass}
        />
      )}
    </div>
  );
};

export default UserIcon;
