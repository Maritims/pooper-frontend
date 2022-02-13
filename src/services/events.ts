import type { ChartDataset } from "chart.js";
import { Marker, Popup } from "mapbox-gl";
import type { EventRead } from '../api';
import { EventType } from "../api";
import type { EnrichedEventType } from "../models/EnrichedEventType";
import { getEnrichedEventType } from "../models/EnrichedEventType";
import { getAverage } from "../utils/NumberUtils";

export const getAllEventTypes = (): Array<EnrichedEventType> => Object.values(EventType).map(eventType => getEnrichedEventType(eventType));

export function getEventMarkers(events: Array<EventRead>): Array<Marker> {
    const groupedEventsMap = events.reduce<Map<string, number>>((acc, event) => {
        const key = `${event.longitude},${event.latitude},${event.event_type}`;
        acc.set(key, (acc.get(key) || 0) + 1);
        return acc;
    }, new Map<string, number>());

    const eventMarkers = [...groupedEventsMap.keys()].map(key => {
        const keyParts = key.split(',');
        const lng = parseFloat(keyParts[0]);
        const lat = parseFloat(keyParts[1]);
        const eventType = keyParts[2];
        const marker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(new Popup().setHTML(`Count: ${groupedEventsMap.get(key)} - Type: ${eventType}`));
        return marker;
    });

    return eventMarkers;
};

function getDates(days: number): Array<Date> {
    return [...Array(days).keys()].map(day => {
        const date = new Date();
        date.setDate(date.getDate() - day);
        date.setHours(0, 0, 0, 0);
        return date;
    }).reverse();
}

export function getLabels(days: number): Array<string> {
    return getDates(days).map(date => date.toLocaleDateString());
}

export function getAllEventTypesDataSets(days: number, events: Array<EventRead>): Array<ChartDataset> {
    if(!events?.length) return [];

    const dataSets = getAllEventTypes().map(enrichedEventType => {
        const counts = getDates(days).map(date => {       
            return events.filter(event => {
                const eventDate = new Date(Date.parse(event.created));
                eventDate.setHours(0, 0, 0, 0);
                return event.event_type === enrichedEventType.eventType && eventDate.getTime() === date.getTime();
            }).length;
        });

        return {
            label: enrichedEventType.eventType,
            data: counts,
            backgroundColor: enrichedEventType.color,
            borderColor: enrichedEventType.color
        };
    });
    return dataSets;
}

export function getPoopRatingDataSets(days: number, events: Array<EventRead>, divisionFactor: number): Array<ChartDataset> {
    if(!events?.length) return [];

    const counts = getDates(days).map(date => {
        const ratings = events.filter(e => {
            const eventDate = new Date(Date.parse(e.created));
            eventDate.setHours(0, 0, 0, 0);
            return e.event_type === EventType.POO && eventDate.getTime() === date.getTime();
        }).map(e => e.rating!);
        return getAverage(ratings) || 0;
    });

    return [{
        label: 'Rating over time',
        data: counts,
        backgroundColor: '#000',
        borderColor: '#000'
    }];
}