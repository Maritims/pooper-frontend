import type { EventRead } from "../../api";
import { getCssPostfix, getTimeSpanForNextEvent } from "../../components/loaders/EventButton";
import { getEnrichedEventType } from "../../models/EnrichedEventType";

export function getCssPostfixForEvents(events: Array<EventRead>): string {
    if(!events.length) return 'event-danger';
    const eventTypes = events.map(animalEventTypeAssociation => getEnrichedEventType(animalEventTypeAssociation.event_type));

    for(let i = 0; i < eventTypes.length; i++) {
        const timeSpanForNextEvent = getTimeSpanForNextEvent(events, eventTypes[i]);
        if(!timeSpanForNextEvent) return 'event-danger';
        const cssPostfix = getCssPostfix(timeSpanForNextEvent.totalMilliseconds, eventTypes[i].intervalInMilliseconds);
        
        if(cssPostfix != 'event-success') return cssPostfix;
    }

    return 'event-success';
}