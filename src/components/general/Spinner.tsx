import cn from '@/utils/cn';
import { FaCircleNotch } from 'react-icons/fa6';

type SpinnerProps = { className?: string };

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div className={cn('animate-spin', className)}>
      <FaCircleNotch />
    </div>
  );
};

export default Spinner;
