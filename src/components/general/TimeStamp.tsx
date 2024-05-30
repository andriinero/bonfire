import cn from '@/utils/cn';

import AppDate from '@/lib/AppDate';

type DateStampProps = {
  date: string;
  className?: string;
};

const TimeStamp = ({ date, className }: DateStampProps) => {
  const diffAsDays: number = AppDate.getFromNowDiffAs(date, 'days');

  const wholeDaysDiff: number = Math.floor(diffAsDays);

  const simple: string = AppDate.getSimple(date);
  const absolute: string = AppDate.getAbsolute(date);

  const absoluteNoYear = absolute.split(', ')[0];
  const dateResult = wholeDaysDiff < 1 ? simple : absoluteNoYear;

  return <span className={cn('', className)}>{dateResult}</span>;
};

export default TimeStamp;
