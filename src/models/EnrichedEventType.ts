import { EventType } from "../api";

export type EnrichedEventType = {
    eventType: EventType
    iconClass: string
    intervalInMilliseconds: number
    color: string
    showOnHomeScreen: boolean
    showOnAnimalScreen: boolean
};

export const getEnrichedEventType = (eventType: EventType): EnrichedEventType => {
    switch(eventType) {
        case EventType.EAT: return {
            eventType: eventType,
            iconClass: 'fa-utensils',
            intervalInMilliseconds: 12 * 60 * 60 * 1000,
            color: '#000000',
            showOnHomeScreen: true,
            showOnAnimalScreen: false
        };
        case EventType.PEE: return {
            eventType: eventType,
            iconClass: 'fa-tint',
            intervalInMilliseconds: 4 * 60 * 60 * 1000,
            color: '#CDCD22',
            showOnHomeScreen: true,
            showOnAnimalScreen: false
        };
        case EventType.POO: return {
            eventType: eventType,
            iconClass: 'fa-poo',
            intervalInMilliseconds: 8 * 60 * 60 * 1000,
            color: '#7A5901',
            showOnHomeScreen: true,
            showOnAnimalScreen: false
        };
        case EventType.FISH_OIL: return {
            eventType: eventType,
            iconClass: 'fa-fish',
            intervalInMilliseconds: 24 * 60 * 60 * 1000,
            color: '#000000',
            showOnHomeScreen: false,
            showOnAnimalScreen: true
        };
        case EventType.VITAMIN_B: return {
            eventType: eventType,
            iconClass: 'fa-capsules',
            intervalInMilliseconds: 24 * 60 * 60 * 1000,
            color: '#000000',
            showOnHomeScreen: false,
            showOnAnimalScreen: true
        };
    }
};