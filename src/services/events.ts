import { EventType } from "../api";

export type EnrichedEventType = {
    eventType: EventType
    iconClass: string
    intervalInHours: number
    color: string
    showOnHomeScreen: boolean
    showOnAnimalScreen: boolean
};

export const getEnrichedEventType = (eventType: EventType): EnrichedEventType => {
    switch(eventType) {
        case EventType.EAT: return {
            eventType: eventType,
            iconClass: 'fa-utensils',
            intervalInHours: 12,
            color: '#000000',
            showOnHomeScreen: true,
            showOnAnimalScreen: false
        };
        case EventType.PEE: return {
            eventType: eventType,
            iconClass: 'fa-tint',
            intervalInHours: 4,
            color: '#CDCD22',
            showOnHomeScreen: true,
            showOnAnimalScreen: false
        };
        case EventType.POO: return {
            eventType: eventType,
            iconClass: 'fa-poo',
            intervalInHours: 8,
            color: '#7A5901',
            showOnHomeScreen: true,
            showOnAnimalScreen: false
        };
        case EventType.FISH_OIL: return {
            eventType: eventType,
            iconClass: 'fa-fish',
            intervalInHours: 24,
            color: '#000000',
            showOnHomeScreen: false,
            showOnAnimalScreen: true
        };
        case EventType.VITAMIN_B: return {
            eventType: eventType,
            iconClass: 'fa-capsules',
            intervalInHours: 24,
            color: '#000000',
            showOnHomeScreen: false,
            showOnAnimalScreen: true
        };
        default: return;
    }
}

export const getAllEventTypes = (): Array<EnrichedEventType> => Object.values(EventType).map(eventType => getEnrichedEventType(eventType));