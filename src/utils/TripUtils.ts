import type { EventRead } from "../api";
import type { Trip } from "../models/Trip";

export function getTripEvents(events: Array<EventRead>, maxMsBetweenEvents: number, identifiedEvents: Array<EventRead> = []): Array<EventRead> {
    if(!events?.length) return [];
    events = events.sort((a, b) => Date.parse(a.created) - Date.parse(b.created));

    const currentEvent = !identifiedEvents.length ? events.shift() : identifiedEvents[0];
    const indexesToRemove: Array<number> = [];
    const newEventsInTrip = events.filter((e, i) => {
        const expr = (Date.parse(e.created) - Date.parse(currentEvent!.created)) <= maxMsBetweenEvents;
        if(expr) indexesToRemove.push(i);
        return expr;
    });
    if(!newEventsInTrip.length) return identifiedEvents;
    for(let i = indexesToRemove.length - 1; i >= 0; i--) {
        events.splice(i, 1);
    }

    identifiedEvents.push(...newEventsInTrip);
    return getTripEvents(events, maxMsBetweenEvents, identifiedEvents);
}

export function getTripFromEvents(eventsInTrip: Array<EventRead>, estimatedMsBeforeFirstEvent: number, estimatedMsAfterLastEvent: number): Trip {
    const date = new Date(Date.parse(eventsInTrip[0].created));
    const durationInMs = Date.parse(eventsInTrip[eventsInTrip.length - 1].created) - Date.parse(eventsInTrip[0].created);
    return {
        date: date,
        durationInMs: durationInMs + estimatedMsBeforeFirstEvent + estimatedMsAfterLastEvent,
        events: eventsInTrip
    };
}

export function getTripsFromEvents(events: Array<EventRead>, estimatedMsBeforeFirstEvent: number, estimatedMsAfterLastEvent: number, identifiedTrips: Array<Trip> = []): Array<Trip> {
    const tripEvents = getTripEvents(events, 1000 * 60 * 60);
    if(!tripEvents.length) return identifiedTrips;
    identifiedTrips.push(getTripFromEvents(tripEvents, estimatedMsBeforeFirstEvent, estimatedMsAfterLastEvent));
    return getTripsFromEvents(events, estimatedMsBeforeFirstEvent, estimatedMsAfterLastEvent, identifiedTrips);
}