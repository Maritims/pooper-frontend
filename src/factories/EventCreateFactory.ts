import { EventType, type EventCreate } from "../api";

export function getEventCreate(): EventCreate {
    return {
        animal_id: 0,
        longitude: 0,
        latitude: 0,
        event_type: EventType.EAT
    }
}