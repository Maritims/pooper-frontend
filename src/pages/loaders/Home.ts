import type { EventRead } from "../../api";
import { getTimeSpanForNextEvent } from "../../components/loaders/EventButton";
import { getEnrichedEventType } from "../../models/EnrichedEventType";

export function getAdditionalEventTypesCssClass(events: Array<EventRead>): string {
    if(!events.length) return 'danger';
    const eventTypes = events.map(animalEventTypeAssociation => getEnrichedEventType(animalEventTypeAssociation.event_type));

    for(let i = 0; i < eventTypes.length; i++) {
        if(eventTypes[i].showOnHomeScreen) continue;
        
        const timeSpanForNextEvent = getTimeSpanForNextEvent(events, eventTypes[i]);
        if(!timeSpanForNextEvent || timeSpanForNextEvent.totalMilliseconds > eventTypes[i].intervalInMilliseconds) return 'danger';
        if((timeSpanForNextEvent.totalMilliseconds / eventTypes[i].intervalInMilliseconds) >= 0.75) return 'warning';
    }

    return 'success';
}