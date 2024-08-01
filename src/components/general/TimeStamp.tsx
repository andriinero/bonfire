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
  const absoluteNoYear: string = AppDate.getAbsoluteNoYear(date);

  const dateResult = wholeDaysDiff < 1 ? simple : absoluteNoYear;

  return <span className={cn('', className)}>{dateResult}</span>;
};

export default TimeStamp;
