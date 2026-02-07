import { add as dateFnsAdd, isBefore, isEqual, isAfter, getYear, getDay, startOfToday  } from "date-fns" ;
import { DATE_UNIT_TYPES } from "./constants";

export function getCurrentYear(): number {
  return getYear(startOfToday());
}

export function add(date: Date, amount: number, type = DATE_UNIT_TYPES.DAYS): Date {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date provided');
  }
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Invalid amount provided');
  }

  let duration = {
    years: DATE_UNIT_TYPES.YEARS == type ? amount : 0,
    months: DATE_UNIT_TYPES.MONTHS == type ? amount : 0,
    weeks: DATE_UNIT_TYPES.WEEKS == type ? amount : 0,
    days: DATE_UNIT_TYPES.DAYS == type ? amount : 0,
    minutes: DATE_UNIT_TYPES.MINUTES == type ? amount : 0,
    seconds: DATE_UNIT_TYPES.SECONDS == type ? amount : 0,
  }

  return dateFnsAdd(date, duration);
}

export function isWithinRange(date: Date, from: Date, to: Date): boolean {
  if (isAfter(from, to)) {
    throw new Error('Invalid range: from date must be before to date');
  }

  return isBefore(date, to) && isAfter(date, from);
}

export function isDateBefore(date: Date, compareDate: Date): boolean {
  return isBefore(date, compareDate);
}

export function isSameDay(date: Date, compareDate: Date): boolean {
  return getDay(date) == getDay(compareDate);
}

// Simulates fetching holidays from an API
export async function getHolidays(year: number): Promise<Date[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        new Date(year, 0, 1),   // New Year's Day
        new Date(year, 11, 25), // Christmas
        new Date(year, 11, 31), // New Year's Eve
      ]);
    }, 100);
  });
}

export async function isHoliday(date: Date): Promise<boolean> {
  const holidays: Date[] = await getHolidays(date.getFullYear());
  return holidays.some(holiday => isEqual(date, holiday));
}
