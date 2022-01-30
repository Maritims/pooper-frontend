export type TimeSpan = {
    hours: number
    minutes: number
    seconds: number
    totalHours: number
    totalMinutes: number
    totalSeconds: number
    totalMilliseconds: number
};

export const getTimeSpan = (latestMilliseconds: number, earliestMilliseconds: number): TimeSpan => {
    let differenceInMilliseconds = latestMilliseconds - earliestMilliseconds;

    const hours = Math.floor(differenceInMilliseconds / 1000 / 60 / 60);
    differenceInMilliseconds -= hours * 1000 * 60 * 60;

    const minutes = Math.floor(differenceInMilliseconds / 1000 / 60);
    differenceInMilliseconds -= minutes * 1000 * 60;

    const seconds = Math.floor(differenceInMilliseconds / 1000);
    differenceInMilliseconds -= seconds * 1000;

    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        totalHours: (latestMilliseconds - earliestMilliseconds) / 1000 / 60 / 60,
        totalMinutes: (latestMilliseconds - earliestMilliseconds) / 1000 / 60,
        totalSeconds: (latestMilliseconds - earliestMilliseconds) / 1000,
        totalMilliseconds: latestMilliseconds - earliestMilliseconds
    };
};

export const getCssPostfix = (millisecondsSincePreviousEvent: number, intervalInMilliseconds: number): string => {
    if(millisecondsSincePreviousEvent > intervalInMilliseconds) return 'danger';
    if((millisecondsSincePreviousEvent / intervalInMilliseconds) >= 0.75) return 'warning';
    return 'success';
};

export const getText = (millisecondsSincePreviousEvent: number, intervalInMilliseconds: number): string => {
    const millisecondsUntilNextEvent = intervalInMilliseconds - millisecondsSincePreviousEvent;
    if(millisecondsSincePreviousEvent > intervalInMilliseconds) return 'Due now';
    
    const hoursUntilNextEvent = millisecondsUntilNextEvent / 1000 / 60 / 60;
    if(hoursUntilNextEvent >= 1) return `Due in ${Math.ceil(hoursUntilNextEvent)} hrs`;

    const minutesUntilNextEvent = millisecondsUntilNextEvent / 1000 / 60;
    if(minutesUntilNextEvent > 0) return `Due in ${Math.ceil(minutesUntilNextEvent)} mins`;

    return 'Due now';
};