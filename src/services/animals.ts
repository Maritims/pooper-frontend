import type { AnimalRead } from "../api";
import { getTimeSpan, TimeSpan } from "../models/TimeFunctions";
import type { EnrichedEventType } from "./events";

export const getTimeSpanForNextEvent = (animal: AnimalRead, eventType: EnrichedEventType): TimeSpan => {
    if(!animal.events.length) return;

    const events = animal.events
    .filter(event => event.event_type == eventType.eventType)
    .sort((a, b) => Date.parse(b.created) - Date.parse(a.created));
    if(!events.length) return;

    const nextEventMilliseconds = Date.parse(events[0].created) + (eventType.intervalInHours * 1000 * 60 * 60);
    return getTimeSpan(new Date().getTime(), nextEventMilliseconds);
};