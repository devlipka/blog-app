import { DateTime } from "luxon";
// Such import fixed the issue with './stream'
import readingTime from "reading-time/lib/reading-time";

export const getReadingTime = (text: string, locale: string) => {
  const minutes = readingTime(text).minutes;
  const minutesRounded = Math.floor(minutes);
  if (locale === "de") {
    if (minutesRounded === 1) {
      return `${minutesRounded} Minute`;
    } else {
      return `${minutesRounded} Minuten`;
    }
  } else {
    if (minutesRounded === 1) {
      return `${minutesRounded} minute`;
    } else {
      return `${minutesRounded} minutes`;
    }
  }
};

export const getRelativeDate = (date: string, locale: string) => {
  return DateTime.fromISO(date).setLocale(locale).toRelative();
};
