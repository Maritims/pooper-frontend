import type { AnimalRead } from '../../api';
import type { EnrichedEventType } from '../../models/EnrichedEventType';
import type { TranslationRequest } from '../../translations';
import { getTimeSpanFromDateOrNumber, getTimeSpanFromDatePair, getTimeSpanString, type TimeSpan } from '../../utils/TimeUtils';

export function getCssPostfix(millisecondsSincePreviousEvent: number, intervalInMilliseconds: number): string {
    if(millisecondsSincePreviousEvent > intervalInMilliseconds) return 'danger';
    if((millisecondsSincePreviousEvent / intervalInMilliseconds) >= 0.75) return 'warning';
    return 'success';
};

export function getText(millisecondsSincePreviousEvent: number, intervalInMilliseconds: number): TranslationRequest {
    const timeSpan          = getTimeSpanFromDateOrNumber(intervalInMilliseconds - millisecondsSincePreviousEvent);
    const includeDays       = !!timeSpan.days;
    const includeHours      = !includeDays && !!timeSpan.hours;
    const includeMinutes    = !includeHours && !!timeSpan.minutes;
    const includeSeconds    = false;
    const timeSpanString    = getTimeSpanString(timeSpan, includeDays, includeHours, includeMinutes, includeSeconds);

    return timeSpanString ? {
        key: 'event.button.due.in',
        substitutions: [timeSpanString]
    } : {
        key: 'event.button.due.now'
    }
};

export function getTimeSpanForNextEvent(animal: AnimalRead, eventType: EnrichedEventType): TimeSpan | undefined {
    if(!animal.events.length) return;

    const previousEventTimestamp: Date = (
        animal.events
        .filter(event => event.event_type == eventType.eventType)
        .sort((olderEvent, newerEvent) => Date.parse(newerEvent.created) - Date.parse(olderEvent.created))
        .map(event => new Date(event.created)) || [undefined]
    )[0];
    if(!previousEventTimestamp) return;

    return getTimeSpanFromDatePair({
        latest: new Date(),
        earliest: previousEventTimestamp
    });
};