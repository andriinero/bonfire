import cn from '@/utils/cn';

type ChatTitleProps = { title: string; className?: string };

const ChatTitle = ({ title, className }: ChatTitleProps) => {
  return <p className={cn('font-medium text-gray-800', className)}>{title}</p>;
};

export default ChatTitle;
