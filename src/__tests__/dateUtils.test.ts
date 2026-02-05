import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { add, getCurrentYear, getHolidays, isDateBefore, isHoliday, isSameDay, isWithinRange } from "../dateUtils";
import { DATE_UNIT_TYPES } from '../constants';

describe("Date Utils", () => {

  
  
  beforeEach(() => {
    vi.useFakeTimers({
      now: new Date("2026-01-01T00:00:00Z"),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });


  describe("getCurrentYear", () => {
    it("should return the current year", () => {
      expect(getCurrentYear()).toBe(2026)
    });
  });

  describe("add", () => {
    const inputDate = new Date("2026-01-30");
    const inpuAmount = 3;

    it("should add correct amount of seconds", () => {
      expect(add(inputDate, inpuAmount, DATE_UNIT_TYPES.SECONDS)).toEqual(new Date("2026-01-30T00:00:03.000Z"));
    });

    it("should add correct amount of munutes", () => {
      expect(add(inputDate, inpuAmount, DATE_UNIT_TYPES.MINUTES)).toEqual(new Date("2026-01-30T00:03:00.000Z"));
    });
    
    it("should add correct amount of days", () => {
      expect(add(inputDate, inpuAmount)).toEqual(new Date("2026-02-02T00:00:00.000Z"));
    });

    it("should add correct amount of weeks", () => {
      expect(add(inputDate, inpuAmount, DATE_UNIT_TYPES.WEEKS)).toEqual(new Date("2026-02-20T00:00:00.000Z"));
    });

    it("should add correct amount of months", () => {
      expect(add(inputDate, inpuAmount, DATE_UNIT_TYPES.MONTHS)).toEqual(new Date("2026-04-30T00:00:00.000Z"));
    });

    it("should subtract correct amount of days", () => {
      expect(add(inputDate, -3)).toEqual(new Date("2026-01-27T00:00:00.000Z"));
    });

    // Exceptions

    it("should throw error for invalid dates", () => {
      expect(() => add(1, inpuAmount)).toThrow("Invalid date provided")
    });

    it("should throw error for invalid amounts", () => {
      expect(() => add(inputDate, "3")).toThrow("Invalid amount provided")
    });

    it("should throw error when date is null", () => {
      expect(() => add(null, 3)).toThrow("Invalid date provided")
    });

    it("should throw error when date is undefined", () => {
      expect(() => add(undefined, 3)).toThrow("Invalid date provided")
    });
  });



  describe("isWithinRange", () => {
    const inputDate = new Date("2026-01-30");

    it("should return true when date is within range", () => {
      const from = new Date("2026-01-20");
      const to = new Date("2026-02-20");
      expect(isWithinRange(inputDate, from, to)).toBe(true)
    });

    it("should return flase when date is out of range", () => {
      const from = new Date("2026-02-20");
      const to = new Date("2026-03-20");
      expect(isWithinRange(inputDate, from, to)).toBe(false)
    });

    it("should return flase when from and to are the same date", () => {
      const from = new Date("2026-02-20");
      const to = new Date("2026-02-20");
      expect(isWithinRange(inputDate, from, to))
    });

    // Exceptions

    it("should throw error when invalid range", () => {
      const from = new Date("2026-02-20");
      const to = new Date("2026-01-20");
      expect(() => isWithinRange(inputDate, from, to)).toThrow('Invalid range: from date must be before to date')
    });
  });


  describe("isDateBefore", () => {
    const inputDate = new Date("2026-01-30");

    it("should return true when the date is before", () => {
      const compareDate = new Date("2026-01-31")
      expect(isDateBefore(inputDate, compareDate)).toBe(true)
    });

    it("should return false when the date is not before", () => {
      const compareDate = new Date("2026-01-29")
      expect(isDateBefore(inputDate, compareDate)).toBe(false)
    });
  });


  describe("isSameDay", () => {
    const inputDate = new Date("2026-01-30");
    
    it("should return true when the dates are the same", () => {
      const compareDate = new Date("2026-01-30")
      expect(isSameDay(inputDate, compareDate)).toBe(true);
    });

    it("should return false when the dates are not the same", () => {
      const compareDate = new Date("2026-01-31")
      expect(isSameDay(inputDate, compareDate)).toBe(false);
    });
  });


  describe("getHolidays", () => {
    it("should return a list with correct dates", async () => {
      const year = 2026;


      const promise = getHolidays(year);

      vi.advanceTimersByTime(100);

      const holidays = await promise;

      expect(holidays).toEqual([
        new Date(year, 0, 1),   // New Year's Day
        new Date(year, 11, 25), // Christmas
        new Date(year, 11, 31), // New Year's Eve
      ]);
    });
  });


  describe("isHoliday", () => {
    it("should return true if the date is a holiday", async () => {
      const promise = isHoliday(new Date("2026-12-25"));
      vi.advanceTimersByTime(100);
      const res = await promise;
      expect(res).toBe(true);
    });

    it("should return false if the date is not a holiday", async () => {
      const promise = isHoliday(new Date("2026-12-26"));
      vi.advanceTimersByTime(100);
      const res = await promise;
      expect(res).toBe(false);
    });
  });



  
});
