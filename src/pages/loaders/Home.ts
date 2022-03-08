import type { AnimalRead } from "../../api";
import { getTimeSpanForNextEvent } from "../../components/loaders/EventButton";
import { getEnrichedEventType } from "../../models/EnrichedEventType";

export function getAdditionalEventTypesCssClass(animal: AnimalRead): string {
    if(!animal.tracked_events?.length) return 'danger';
    const eventTypes = animal.tracked_event_types.map(animalEventTypeAssociation => getEnrichedEventType(animalEventTypeAssociation.event_type));

    for(let i = 0; i < eventTypes.length; i++) {
        if(eventTypes[i].showOnHomeScreen) continue;
        
        const timeSpanForNextEvent = getTimeSpanForNextEvent(animal, eventTypes[i]);
        if(!timeSpanForNextEvent || timeSpanForNextEvent.totalMilliseconds > eventTypes[i].intervalInMilliseconds) return 'danger';
        if((timeSpanForNextEvent.totalMilliseconds / eventTypes[i].intervalInMilliseconds) >= 0.75) return 'warning';
    }

    return 'success';
}