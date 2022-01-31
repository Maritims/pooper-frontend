import { Marker, Popup } from "mapbox-gl";
import type { EventRead } from '../api';
import { EventType } from "../api";
import type { EnrichedEventType } from "../models/EnrichedEventType";
import { getEnrichedEventType } from "../models/EnrichedEventType";

export const getAllEventTypes = (): Array<EnrichedEventType> => Object.values(EventType).map(eventType => getEnrichedEventType(eventType));

export function getEventMarkers(events: Array<EventRead>): Array<Marker> {
    const groupedEventsMap = events.reduce<Map<string, number>>((acc, event) => {
        const key = `${event.longitude},${event.latitude},${event.event_type}`;
        acc.set(key, (acc.get(key) || 0) + 1);
        return acc;
    }, new Map<string, number>());
    
    const eventMarkers = Object.keys(groupedEventsMap).map(key => {
        const keyParts = key.split(',');
        const lng = parseFloat(keyParts[0]);
        const lat = parseFloat(keyParts[1]);
        const eventType = keyParts[2];
        return new Marker()
        .setLngLat([lng, lat])
        .setPopup(new Popup().setHTML(`Count: ${groupedEventsMap.get(key)} - Type: ${eventType}`));
    });

    return eventMarkers;
};