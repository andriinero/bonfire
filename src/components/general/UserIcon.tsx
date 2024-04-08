import cn from '@/utils/cn';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type UserIconProps = {
  className?: string;
} & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const UserIcon = ({ className, ...otherProps }: UserIconProps) => {
  return (
    <div>
      <div className="absolute ml-6 rounded-full border-2 border-white bg-green-400 p-1.5" />
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
