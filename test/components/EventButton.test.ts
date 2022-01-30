import { describe, it, expect } from '@jest/globals';
import { getCssPostfix, getText } from '../../src/components/EventButton';

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