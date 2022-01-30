import { describe, it, expect } from '@jest/globals';
import { getMeanOfDifferences } from '../../src/utils/NumberUtils';

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