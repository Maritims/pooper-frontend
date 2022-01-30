/**
 * Calculates the mean value of the difference between the number pairs in a list of numbers.
 * This function can, among other things, be used to calculate the mean value of the difference between a set of dates as long as the dates are provided as milliseconds since 1970-01-01 00:00:00. Just remember that the result will be in milliseconds.
 * @param nums The data set to base calculations the on.
 * @returns The mean value of the difference between the number pairs in the provided data set.
 */
export function getMeanOfDifferences(nums: Array<number>): number {
    const diffs = nums.reduce((accumulator, num, i) => {
        if((i + 1) == nums.length) return accumulator;
        
        accumulator.push(num - nums[i + 1]);
        
        return accumulator;
    }, []);

    const meanOfDiffs = diffs.reduce((sum, diff) => sum += diff, 0) / diffs.length;
    return meanOfDiffs;
};