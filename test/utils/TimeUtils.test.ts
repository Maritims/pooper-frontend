import { describe, it, expect } from '@jest/globals';
import { getMostFrequentHourFromDates, getTimeSpanFromDatePair, getTimeSpanString } from '../../src/utils/TimeUtils';

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

describe('getMostFrequentHourFromDates', () => {
    it('should get the hour which occurs most often among a list of dates', () => {
        const dates = [
            new Date(Date.parse('2022-01-01 18:00:22')),
            new Date(Date.parse('2022-01-02 18:34:18')),
            new Date(Date.parse('2022-01-03 18:57:08')),
            new Date(Date.parse('2022-01-04 17:00:50')),
            new Date(Date.parse('2022-01-05 17:14:40')),
            new Date(Date.parse('2022-01-06 17:34:03')),
            new Date(Date.parse('2022-01-07 18:06:17')),
            new Date(Date.parse('2022-01-08 17:32:47')),
            new Date(Date.parse('2022-01-09 17:42:53'))
        ];

        const maxHour = getMostFrequentHourFromDates(dates);
        expect(maxHour).toBe(17);
    });

    it("shouldn't crash when there aren't any dates", () => {
        expect(getMostFrequentHourFromDates([])).toBeUndefined();
    });
});