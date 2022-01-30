import { describe, it, expect } from '@jest/globals';
import { getTimeSpan, getCssPostfix, getText } from '../src/models/TimeSpan';

describe('getTimeSpan', () => {
    it('should calculate the correct timespan for two dates', () => {
        const earliestDate = new Date(Date.parse('2022-01-01 08:00:00'));
        const latestDate = new Date(Date.parse('2022-01-01 16:00:00'));
        const timeSpan = getTimeSpan(latestDate.getTime(), earliestDate.getTime());

        expect(timeSpan.hours).toBe(8);
        expect(timeSpan.minutes).toBe(0);
        expect(timeSpan.seconds).toBe(0);

        expect(timeSpan.totalHours).toBe(8);
        expect(timeSpan.totalMinutes).toBe(8*60);
        expect(timeSpan.totalSeconds).toBe(8*60*60);
    });
});

describe('getCssPostfix', () => {
    it('should return danger when time since previous event is greater than interval', () => {
        expect(getCssPostfix(9, 8)).toBe('danger');
    });

    it("should return warning when time since previous event is greater than or equal to 75% of interval", () => {
        expect(getCssPostfix(6, 8)).toBe('warning');
    });

    it('should return success when time since previous event is less than 75% of interval', () => {
        expect(getCssPostfix(5, 8)).toBe('success');
    });
});

describe('getText', () => {
    it("shold return 'Due now' when time since previous event is greater than interval'", () => {
        expect(getText(9 * 60 * 60 * 1000, 8 * 60 * 60 * 1000)).toBe('Due now');
    });

    it("should return 'Due in 8 hours' when it's 1 hour since the previous event and the interval is 9 hours", () => {
        expect(getText(1 * 60 * 60 * 1000, 9 * 60 * 60 * 1000)).toBe('Due in 8 hrs');
    });

    it("should return 'Due in 59 minutes' when minutes until next event is greater than 0, but less than 60", () => {
        expect(getText(1 * 60 * 1000, 1 * 60 * 60 * 1000)).toBe('Due in 59 mins');
    });
});