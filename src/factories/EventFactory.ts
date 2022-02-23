import { EventType, type EventCreate, type EventRead } from "../api";

export function getEventCreate(): EventCreate {
    return {
        animal_id: 0,
        longitude: 0,
        latitude: 0,
        event_type: EventType.EAT
    }
};

export function getEventRead(): EventRead {
    return {
        latitude: 0,
        longitude: 0,
        animal_id: 0,
        event_type: EventType.POO,
        created: '',
        id: 0,
        created_by_user_id: 0,
        created_by_user_name: '',
        animal_name: ''
    }
};