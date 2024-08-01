import { DateTime } from 'luxon';

import type { DurationLikeObject } from 'luxon';

const getRelative = (date: string) => {
  return DateTime.fromISO(date).toRelative() as string;
};

const getSimple = (date: string) => {
  return DateTime.fromISO(date).toLocaleString(DateTime.TIME_SIMPLE);
};

const getAbsolute = (date: string) => {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
};

const getAbsoluteNoYear = (date: string) => {
  const dateTime = DateTime.fromISO(date);
  const day = dateTime.day;
  const month = dateTime.monthShort;

  return `${day} ${month}`;
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
  getAbsoluteNoYear,
  getFromNowDiffAs,
  getMedDate,
} as const;
