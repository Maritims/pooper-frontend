import { Marker, Popup } from "mapbox-gl";
import { EventRead, EventType } from "../api";
import { EnrichedEventType, getEnrichedEventType } from "../models/EnrichedEventType";

export const getAllEventTypes = (): Array<EnrichedEventType> => Object.values(EventType).map(eventType => getEnrichedEventType(eventType));

export function getEventMarkers(events: Array<EventRead>): Array<Marker> {
    const groupedEvents = events.reduce((acc, event) => {
        const key = `${event.longitude},${event.latitude},${event.event_type}`;
        if(!acc[key]) acc[key] = 0;
        acc[key]++;
        return acc;
    }, {});

    const eventMarkers = Object.keys(groupedEvents).map(key => {
        const keyParts = key.split(',');
        const lng = parseFloat(keyParts[0]);
        const lat = parseFloat(keyParts[1]);
        const eventType = keyParts[2];
        return new Marker()
        .setLngLat([lng, lat])
        .setPopup(new Popup().setHTML(`Count: ${groupedEvents[key]} - Type: ${eventType}`));
    });

    return eventMarkers;
};