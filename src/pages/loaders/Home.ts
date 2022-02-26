import type { AnimalRead } from "../../api";
import { getTimeSpanForNextEvent } from "../../components/loaders/EventButton";
import type { EnrichedEventType } from "../../models/EnrichedEventType";

export function getAdditionalEventTypesCssClass(animal: AnimalRead, eventTypes: Array<EnrichedEventType>): string {
    if(!animal.events?.length) return 'danger';

    for(let i = 0; i < eventTypes.length; i++) {
        if(eventTypes[i].showOnHomeScreen) continue;
        
        const timeSpanForNextEvent = getTimeSpanForNextEvent(animal, eventTypes[i]);
        if(!timeSpanForNextEvent || timeSpanForNextEvent.totalMilliseconds > eventTypes[i].intervalInMilliseconds) return 'danger';
        if((timeSpanForNextEvent.totalMilliseconds / eventTypes[i].intervalInMilliseconds) >= 0.75) return 'warning';
    }

    return 'success';
}