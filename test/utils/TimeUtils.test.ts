import { describe, it, expect } from '@jest/globals';
import { getTimeSpanFromDatePair, getTimeSpanString } from '../../src/utils/TimeUtils';

describe('getTimeSpanForDatePair', () => {
    it('should calculate the correct timespan for two dates', () => {
        const timeSpan = getTimeSpanFromDatePair({
            latest: new Date(Date.parse('2022-01-01 16:00:00')),
            earliest: new Date(Date.parse('2022-01-01 08:00:00'))
        });

        expect(timeSpan.hours).toBe(8);
        expect(timeSpan.minutes).toBe(0);
        expect(timeSpan.seconds).toBe(0);

        expect(timeSpan.totalHours).toBe(8);
        expect(timeSpan.totalMinutes).toBe(8*60);
        expect(timeSpan.totalSeconds).toBe(8*60*60);
    });
});

describe('getTimeSpanString', () => {
    [{
        input: getTimeSpanString(getTimeSpanFromDatePair({
            latest: new Date(Date.parse('2022-01-01 16:00:00')),
            earliest: new Date(Date.parse('2022-01-01 08:00:00'))
        })),
        output: '8 hrs'
    }, {
        input: getTimeSpanString(getTimeSpanFromDatePair({
            latest: new Date(Date.parse('2022-01-15 15:00:00')),
            earliest: new Date(Date.parse('2022-01-01 15:53:32'))
        })),
        output: '13 days, 23 hrs, 6 mins and 28 secs'
    }].forEach(({ input, output }) => {
        it(`should return ${output} when input is ${input}`, () => {
            expect(input).toBe(output);
        });
    });
});