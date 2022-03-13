import type { EventRead } from '../../api';
import type { EnrichedEventType } from '../../models/EnrichedEventType';
import type { TranslationRequest } from '../../translations';
import { getTimeSpanFromDateOrNumber, getTimeSpanFromDatePair, getTimeSpanString, type TimeSpan } from '../../utils/TimeUtils';

export function getCssPostfix(millisecondsSincePreviousEvent: number, intervalInMilliseconds: number): string {
    if(millisecondsSincePreviousEvent > intervalInMilliseconds) return 'event-danger';
    if((millisecondsSincePreviousEvent / intervalInMilliseconds) >= 0.75) return 'event-warning';
    return 'primary';
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

export function getTimeSpanForNextEvent(events: Array<EventRead>, eventType: EnrichedEventType): TimeSpan | undefined {
    if(!events.length) return;

    const previousEventTimestamp: Date = (
        events
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

export type EventButtonOptions = {
    animalId: number
    animalName: string
    compact: boolean
    eventType: EnrichedEventType
    events: Array<EventRead>
};