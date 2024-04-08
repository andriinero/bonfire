import cn from '@/utils/cn';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type UserIconProps = {
  isOnline?: boolean;
  style?: 'md' | 'lg';
} & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const UserIcon = ({
  isOnline = false,
  style = 'md',
  ...otherProps
}: UserIconProps) => {
  return (
    <div>
      <div
        className={cn(
          'invisible absolute ml-6 rounded-full border-2 border-white bg-green-400 p-1.5',
          { visible: isOnline },
          { 'ml-8': style === 'lg' },
        )}
      />
      <img
        src="/profile-placeholder.jpeg"
        className={cn('size-10 rounded-full text-gray-400', {
          'size-10': style === 'md',
          'size-12': style === 'lg',
        })}
        alt="User Icon"
        {...otherProps}
      />
    </div>
  );
};

export default UserIcon;
