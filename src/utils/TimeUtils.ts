export type TimeSpan = {
    days: number
    hours: number
    minutes: number
    seconds: number
    totalDays: number
    totalHours: number
    totalMinutes: number
    totalSeconds: number
    totalMilliseconds: number
};

export type DatePair = {
    earliest: Date
    latest: Date
};

const getDays = (ms: number): number => ms >= (1000 * 24 * 60 * 60) ? Math.floor(ms / 1000 / 24 / 60 / 60) : 0;
const getHours = (ms: number): number => ms >= (1000 * 60 * 60) ? Math.floor(ms / 1000 / 60 / 60) : 0;
const getMins = (ms: number): number => ms >= (1000 * 60) ? Math.floor(ms / 1000 / 60) : 0;
const getSecs = (ms: number): number => ms >= 1000 ? Math.floor(ms / 1000) : 0;
const getMillisecs = (ms: number): number => ms;

export function getTimeSpanFromDateOrNumber(ms: number | Date): TimeSpan {
    ms = ms instanceof Date && typeof ms.getMonth === 'function' ? ms.getTime() : ms as number;
    const totalMs = getMillisecs(ms);
    
    const days = getDays(ms);
    ms -= days * 1000 * 24 * 60 * 60;

    const hrs = getHours(ms);
    ms -= hrs * 1000 * 60 * 60;

    const mins = getMins(ms);
    ms -= mins * 1000 * 60;

    const secs = getSecs(ms);
    ms -= secs * 1000;

    return {
        days: days,
        hours: hrs,
        minutes: mins,
        seconds: secs,
        totalDays: getDays(totalMs),
        totalHours: getHours(totalMs),
        totalMinutes: getMins(totalMs),
        totalSeconds: getSecs(totalMs),
        totalMilliseconds: totalMs
    };
}

export function getTimeSpanFromDatePair(dates: DatePair): TimeSpan {
    return getTimeSpanFromDateOrNumber(dates.latest.getTime() - dates.earliest.getTime());
}

export function getTimeSpanString(
    timeSpan: TimeSpan,
    includeDays = true,
    includeHours = true,
    includeMinutes = true,
    includeSeconds = true
    ): string {
        const parts = [];
    
        if(includeDays && timeSpan.days > 0) parts.push(`${timeSpan.days} days`);
        if(includeHours && timeSpan.hours > 0) parts.push(`${timeSpan.hours} hrs`);
        if(includeMinutes && timeSpan.minutes > 0) parts.push(`${timeSpan.minutes} mins`);
        if(includeSeconds && timeSpan.seconds > 0) parts.push(`${timeSpan.seconds} secs`);
        
        return parts.join(', ').replace(/,\s([^,]+)$/, ' and $1');
    }

export function getTimeSpanStringFromMilliseconds(ms: number): string {
    const timeSpan = getTimeSpanFromDateOrNumber(ms);
    const timeSpanString = getTimeSpanString(timeSpan);
    return timeSpanString;
}

export function getMostFrequentHourFromDates(dates: Array<Date>): number | undefined {
    type Count = {
        key: number
        value: number
    };

    return dates.reduce<Array<Count>>((acc, date) => {
        const obj = acc.find(count => count.key === date.getHours());
        if(obj) obj.value += 1;
        else acc.push({
            key: date.getHours(),
            value: 1
        }); 
        return acc;
    }, []).sort((a, b) => b.value - a.value)[0]?.key;
}

export function isToday(milliseconds: number): boolean {
    const today = new Date().setHours(0, 0, 0, 0);
    const thatDay = new Date(milliseconds).setHours(0, 0, 0, 0);
    return today === thatDay;
}