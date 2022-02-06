import { describe, it, expect } from '@jest/globals';
import { getAverage, getMeanOfDifferences } from '../../src/utils/NumberUtils';

describe('getMeanOfDifferences', () => {
    it('should return the mean of the differences between date pairs', () => {
        let dates = [
            Date.parse('2022-01-01 08:00:00'),
            Date.parse('2022-01-01 06:00:00'),
            Date.parse('2022-01-01 04:00:00'),
            Date.parse('2022-01-01 02:00:00'),
            Date.parse('2022-01-01 00:00:00')
        ];

        const meanOfDiffs = getMeanOfDifferences(dates) / 1000 / 60 / 60;
        expect(meanOfDiffs).toBe(2);
    });
});

describe('getAverage', () => {
    it('should return the average of all numbers in set', () => {
        const numbers = [5, 4, 5, 2];
        const average = getAverage(numbers);
        expect(average).toBe(4);
    });

    it('should not take undefined values into consideration', () => {
        const numbers = [5, 4, undefined, 5, 2];
        const average = getAverage(numbers);
        expect(average).toBe(4);
    })
});