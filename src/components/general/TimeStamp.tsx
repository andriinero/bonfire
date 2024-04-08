import cn from '@/utils/cn';

import { appDate } from '@/lib/appDate';

type DateStampProps = {
  date: string;
  className?: string;
};

const TimeStamp = ({ date, className }: DateStampProps) => {
  const diffAsDays: number = appDate.getFromNowDiffAs(date, 'days');

  const wholeDaysDiff: number = Math.floor(diffAsDays);

  const simple: string = appDate.getSimple(date);
  const absolute: string = appDate.getAbsolute(date);

  const absoluteNoYear = absolute.split(', ')[0];
  const dateResult = wholeDaysDiff < 1 ? simple : absoluteNoYear;

  return (
    <span className={cn('text-sm font-medium text-neutral-500', className)}>
      {dateResult}
    </span>
  );
};

export default TimeStamp;
