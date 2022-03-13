import { describe, it, expect } from '@jest/globals';
import { getCssPostfix, getText } from '../../src/components/loaders/EventButton';

describe('getCssPostfix', () => {
    it('should return danger when time since previous event is greater than interval', () => {
        expect(getCssPostfix(9, 8)).toBe('event-danger');
    });

    it("should return warning when time since previous event is greater than or equal to 75% of interval", () => {
        expect(getCssPostfix(6, 8)).toBe('event-warning');
    });

    it('should return primary when time since previous event is less than 75% of interval', () => {
        expect(getCssPostfix(5, 8)).toBe('primary');
    });
});

describe('getText', () => {
    it("shold return 'Due now' when time since previous event is greater than interval'", () => {
        expect(getText(9 * 60 * 60 * 1000, 8 * 60 * 60 * 1000)).toStrictEqual({
            key: 'event.button.due.now'
        });
    });

    it("should return 'Due in 8 hours' when it's 1 hour since the previous event and the interval is 9 hours", () => {
        expect(getText(1 * 60 * 60 * 1000, 9 * 60 * 60 * 1000)).toStrictEqual({
            key: 'event.button.due.in',
            substitutions: ['8 hrs']
        });
    });

    it("should return 'Due in 59 minutes' when minutes until next event is greater than 0, but less than 60", () => {
        expect(getText(1 * 60 * 1000, 1 * 60 * 60 * 1000)).toStrictEqual({
            key: 'event.button.due.in',
            substitutions: ['59 mins']
        });
    });
});