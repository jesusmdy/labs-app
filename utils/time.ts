import {
  isYesterday,
  isToday,
  differenceInHours,
  differenceInMinutes,
  differenceInDays,
  differenceInMilliseconds,
  getDaysInMonth,
} from "date-fns";

const LOCALE = "en-US";

export function formatter(date: Date, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(LOCALE, options).format(date);
}

export function formatHourAndMinute(date: Date): string {
  return formatter(date, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDayAndMonth(date: Date): string {
  return formatter(date, {
    month: "short",
    day: "numeric",
  });
}

export function formatTimeDistance(
  date: Date,
  asHourAndMinute?: boolean,
): string {
  const now = new Date();
  const distance = differenceInMilliseconds(now.getTime(), date.getTime());
  const distanceInHours = differenceInHours(date, now);
  const distanceInMinutes = differenceInMinutes(date, now);
  const distanceInDays = differenceInDays(date, now);
  const daysInMonth = getDaysInMonth(date);

  if (distance < 60000) {
    if (asHourAndMinute) return formatHourAndMinute(date);
    return "Just now";
  }
  if (distance < 3600000) {
    if (asHourAndMinute) return formatHourAndMinute(date);
    return `${Math.abs(distanceInMinutes)}m`;
  }
  if (distance < 86400000) {
    if (asHourAndMinute) return formatHourAndMinute(date);
    return `${Math.abs(distanceInHours)}h`;
  }
  if (Math.abs(distanceInDays) > Math.abs(daysInMonth))
    return formatDayAndMonth(date);

  return `${Math.abs(distanceInDays)}d`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  if (isYesterday(date)) {
    return `Yesterday at ${formatHourAndMinute(date)}`;
  }
  if (isToday(date)) {
    return formatHourAndMinute(date);
  }
  return `${formatDayAndMonth(date)} at ${formatHourAndMinute(date)}`;
}

export function formatDay(dateString: string) {
  const date = new Date(dateString);
  const today = isToday(date);
  const yesterday = isYesterday(date);
  if (today) return "Today";
  if (yesterday) return "Yesterday";
  return formatDayAndMonth(date);
}
