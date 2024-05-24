import cn from '@/utils/cn';

import { FaCircleNotch } from 'react-icons/fa6';

type SpinnerProps = { className?: string };

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center',
        className,
      )}
    >
      <FaCircleNotch
        className="animate-spin"
        size="1.5rem"
        aria-label="Spinner Icon"
      />
    </div>
  );
};

export default Spinner;
