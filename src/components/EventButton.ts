import { getTimeSpanFromDateOrNumber, getTimeSpanString } from '../utils/TimeUtils';

export function getCssPostfix(millisecondsSincePreviousEvent: number, intervalInMilliseconds: number): string {
    if(millisecondsSincePreviousEvent > intervalInMilliseconds) return 'danger';
    if((millisecondsSincePreviousEvent / intervalInMilliseconds) >= 0.75) return 'warning';
    return 'success';
};

export function getText(millisecondsSincePreviousEvent: number, intervalInMilliseconds: number): string {
    const timeSpan          = getTimeSpanFromDateOrNumber(intervalInMilliseconds - millisecondsSincePreviousEvent);
    const includeDays       = !!timeSpan.days;
    const includeHours      = !includeDays && !!timeSpan.hours;
    const includeMinutes    = !includeHours && !!timeSpan.minutes;
    const includeSeconds    = false;
    const timeSpanString    = getTimeSpanString(timeSpan, includeDays, includeHours, includeMinutes, includeSeconds);
    const text = 'Due ' + (timeSpanString ? `in ${timeSpanString}` : 'now');
    return text;
};