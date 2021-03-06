import type { ChartDataset } from "chart.js";
import { EventType, type EventRead } from "../../api";
import { getAllEventTypes } from "./Events";
import { getAverage } from "../../utils/NumberUtils";
import { getEnrichedEventType, type EnrichedEventType } from "../../models/EnrichedEventType";
import { getTimeSpanFromDatePair, isToday } from "../../utils/TimeUtils";

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

export function getPoopRatingDataSets(days: number, events: Array<EventRead>): Array<ChartDataset> {
    if(!events?.length) return [];

    const counts = getDates(days).map(date => {
        const ratings = events.filter(e => {
            const eventDate = new Date(Date.parse(e.created));
            eventDate.setHours(0, 0, 0, 0);
            return e.event_type === EventType.POO && eventDate.getTime() === date.getTime();
        }).map(e => e.rating);
        return getAverage(ratings) || 0;
    });

    return [{
        label: 'Rating over time',
        data: counts,
        backgroundColor: getEnrichedEventType(EventType.POO).color,
        borderColor: getEnrichedEventType(EventType.POO).color
    }];
}

export function getEventsInChosenPeriod(events: Array<EventRead>, eventType: EnrichedEventType, days: number): Array<EventRead> {
    return events.filter(e => {
        if(e.event_type != eventType.eventType) return false;
        if(days == 1) return isToday(Date.parse(e.created));
        return getTimeSpanFromDatePair({
            latest: new Date(),
            earliest: new Date(Date.parse(e.created))
        }).totalDays <= days;
    })
}