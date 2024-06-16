import cn from '@/utils/cn';

import { LoaderCircle } from 'lucide-react';

type SpinnerProps = { className?: string };

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center',
        className,
      )}
    >
      <LoaderCircle
        aria-label="Spinner Icon"
        className="animate-spin text-3xl"
      />
    </div>
  );
};

export default Spinner;
