import { EventType } from "../api";

export type EnrichedEventType = {
    eventType: EventType
    iconClass: string
    intervalInHours: number
    color: string
};

export const getEnrichedEventType = (eventType: EventType): EnrichedEventType => {
    switch(eventType) {
        case EventType.EAT: return {
            eventType: eventType,
            iconClass: 'fa-utensils',
            intervalInHours: 12,
            color: '#000000'
        };
        case EventType.PEE: return {
            eventType: eventType,
            iconClass: 'fa-tint',
            intervalInHours: 4,
            color: '#CDCD22'
        };
        case EventType.POO: return {
            eventType: eventType,
            iconClass: 'fa-poo',
            intervalInHours: 8,
            color: '#7A5901'
        };
        default: return;
    }
}

export const getAllEventTypes = (): Array<EnrichedEventType> => Object.values(EventType).map(eventType => getEnrichedEventType(eventType));