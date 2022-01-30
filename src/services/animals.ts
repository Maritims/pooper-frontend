import type { AnimalRead } from "../api";
import type { EnrichedEventType } from "../models/EnrichedEventType";
import type { TimeSpan } from '../models/TimeSpan';
import { getTimeSpan } from "../models/TimeSpan";

export const getTimeSpanForNextEvent = (animal: AnimalRead, eventType: EnrichedEventType): TimeSpan => {
    if(!animal.events.length) return;

    const previousEventTimestamp: Date = (
        animal.events
        .filter(event => event.event_type == eventType.eventType)
        .sort((olderEvent, newerEvent) => Date.parse(newerEvent.created) - Date.parse(olderEvent.created))
        .map(event => new Date(event.created)) || [undefined]
    )[0];
    if(!previousEventTimestamp) return;

    return getTimeSpan(new Date().getTime(), previousEventTimestamp.getTime());
};