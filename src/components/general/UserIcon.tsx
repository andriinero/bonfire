import cn from '@/utils/cn';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type UserIconProps = {
  isOnline?: boolean;
  className?: string;
} & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const UserIcon = ({
  isOnline = false,
  className,
  ...otherProps
}: UserIconProps) => {
  return (
    <div>
      <div
        className={cn(
          'absolute ml-6 hidden rounded-full border-2 border-white bg-green-400 p-1.5',
          { visible: isOnline },
        )}
      />
      <img
        src="/profile-placeholder.jpeg"
        className={cn('size-10 rounded-full text-gray-400', className)}
        alt="User Icon"
        {...otherProps}
      />
    </div>
  );
};

export default UserIcon;
