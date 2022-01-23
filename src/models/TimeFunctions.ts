export type TimeSpan = {
    hours: number
    minutes: number
    seconds: number
};

export const getTimeSpan = (earliestMilliseconds: number, latestMilliseconds: number): TimeSpan => {
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
        seconds: seconds
    };
};

export const getCssPostfix = (timeSpan: TimeSpan): string => {
    if(!timeSpan) return 'danger';
    if(timeSpan.hours > 0) return 'success';
    else if(timeSpan.minutes > 0) return 'warning';
    return 'danger';
};

export const getText = (timeSpan: TimeSpan): string => {
    if(!timeSpan) return 'Due now';
    if(timeSpan.hours > 0) return `Due in ${timeSpan.hours} hrs`;
    if(timeSpan.minutes > 0) return `Due in ${timeSpan.minutes} mins`;
    return 'Due now';
};