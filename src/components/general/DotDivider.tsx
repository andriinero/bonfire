import cn from '@/utils/cn';

type DotDividerProps = {
  className?: string;
};

const DotDivider = ({ className }: DotDividerProps) => {
  return <span className={cn('', className)}>·</span>;
};

export default DotDivider;
