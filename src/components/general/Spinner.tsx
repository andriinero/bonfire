import cn from '@/utils/cn';
import { FaSpinner } from 'react-icons/fa6';

type SpinnerProps = { className?: string };

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center',
        className,
      )}
    >
      <div className="animate-spin">
        <FaSpinner size="1.5rem" />
      </div>
    </div>
  );
};

export default Spinner;
