/**
 * Calculates the mean value of the difference between the number pairs in a list of numbers.
 * This function can, among other things, be used to calculate the mean value of the difference between a set of dates as long as the dates are provided as milliseconds since 1970-01-01 00:00:00. Just remember that the result will be in milliseconds.
 * @param nums The data set to base calculations the on.
 * @returns The mean value of the difference between the number pairs in the provided data set.
 */
export function getMeanOfDifferences(nums: Array<number>): number {
    const diffs = nums.reduce<Array<number>>((accumulator, num, i) => {
        if((i + 1) == nums.length) return accumulator;
        
        accumulator.push(num - nums[i + 1]);
        
        return accumulator;
    }, []);

    const meanOfDiffs = diffs.reduce((sum, diff) => sum += diff, 0) / diffs.length;
    return meanOfDiffs;
};

export function getAverage(nums: Array<number | undefined>): number | undefined {
    nums = nums.filter(num => !!num);
    return nums.length ? nums.reduce<number>((sum, num) => sum += num as number, 0) / nums.length : undefined;
};

export type NumberRange = {
    min: number
    max: number
};

export function getFloorAndCeil(i: number, max: number, factor: number): NumberRange {
    if(i > max) throw new Error(`i ${i} is higher than max ${max}`);

    const range: NumberRange = {
        min: Math.floor(i / factor) * factor,
        max: Math.ceil(i / factor) * factor
    };
    if(range.max === i) range.max += factor;

    return range;
};