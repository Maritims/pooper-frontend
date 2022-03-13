import type { EventRead } from "../../api";
import { getTimeSpanForNextEvent } from "../../components/loaders/EventButton";
import { getEnrichedEventType } from "../../models/EnrichedEventType";

export function getAdditionalEventTypesCssClass(events: Array<EventRead>): string {
    if(!events.length) return 'event-danger';
    const eventTypes = events.map(animalEventTypeAssociation => getEnrichedEventType(animalEventTypeAssociation.event_type));

    for(let i = 0; i < eventTypes.length; i++) {
        if(eventTypes[i].showOnHomeScreen) continue;
        
        const timeSpanForNextEvent = getTimeSpanForNextEvent(events, eventTypes[i]);
        if(!timeSpanForNextEvent || timeSpanForNextEvent.totalMilliseconds > eventTypes[i].intervalInMilliseconds) return 'event-danger';
        if((timeSpanForNextEvent.totalMilliseconds / eventTypes[i].intervalInMilliseconds) >= 0.75) return 'event-warning';
    }

    return 'event-success';
}