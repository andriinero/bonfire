import { DateTime, DurationLikeObject } from 'luxon';

const getRelative = (date: string) => {
  return DateTime.fromISO(date).toRelative() as string;
};

const getSimple = (date: string) => {
  return DateTime.fromISO(date).toLocaleString(DateTime.TIME_SIMPLE);
};

const getAbsolute = (date: string) => {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
};

const getFromNowDiffAs = (date: string, diffType: keyof DurationLikeObject) => {
  const duration = DateTime.fromJSDate(new Date()).diff(DateTime.fromISO(date));
  const diff = duration.as(diffType);

  return diff;
};

const getMedDate = (date: string) => {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
};

export default {
  getRelative,
  getSimple,
  getAbsolute,
  getFromNowDiffAs,
  getMedDate,
} as const;
