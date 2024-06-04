import cn from '@/utils/cn';

import type { ComponentProps } from 'react';
import FallbackIcon from './FallbackIcon';

type UserIconProps = {
  title?: string;
  colorClass?: string;
  src?: string;
  isOnline?: boolean;
  style?: 'xs' | 'md' | 'lg';
} & ComponentProps<'img'>;

const UserIcon = ({
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
          'invisible absolute ml-6 size-4 select-none rounded-full border-2 border-white bg-green-400',
          { visible: isOnline },
          { 'ml-8': style === 'lg' },
        )}
      />
      {src ? (
        <img
          src={src}
          className={cn(
            'size-10 select-none rounded-full object-cover text-gray-400',
            {
              'size-6': style === 'xs',
              'size-10': style === 'md',
              'size-12': style === 'lg',
            },
          )}
          alt="User Icon"
          {...otherProps}
        />
      ) : (
        <FallbackIcon title={title} colorClass={colorClass} />
      )}
    </div>
  );
};

export default UserIcon;
