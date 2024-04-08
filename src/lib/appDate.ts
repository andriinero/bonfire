import { DateTime, DurationLikeObject } from 'luxon';

export const appDate = {
  getRelative: (date: string) => {
    return DateTime.fromISO(date).toRelative() as string;
  },
  getSimple: (date: string) => {
    return DateTime.fromISO(date).toLocaleString(DateTime.TIME_SIMPLE);
  },
  getAbsolute: (date: string) => {
    return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
  },
  getFromNowDiffAs: (date: string, diffType: keyof DurationLikeObject) => {
    const duration = DateTime.fromJSDate(new Date()).diff(
      DateTime.fromISO(date),
    );
    const diff = duration.as(diffType);

    return diff;
  },
  getMedDate: (date: string) =>
    DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED),
};
