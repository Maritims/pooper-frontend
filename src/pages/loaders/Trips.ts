import { addRoute } from '../../components/loaders/Map';
import type { Map } from 'mapbox-gl';
import { EventsService, type EventRead } from "../../api";

export type Trip = {
    startTime: Date
    stopTime: Date
    durationInMs: number
    events: Array<EventRead>
};

export function addRouteForEvents(homeLongitude: number, homeLatitude: number, events: Array<EventRead>, mapboxMap: Map) {
    addRoute(mapboxMap, [{
        lng: homeLongitude,
        lat: homeLatitude
    }, ...events.map(e => {
        return {
            lng: e.longitude,
            lat: e.latitude
        }
    }), {
        lng: homeLongitude,
        lat: homeLatitude
    }])
}

export function getEventsInTrip(events: Array<EventRead>, maxMsBetweenEvents: number, eventsInTrip: Array<EventRead> = []): Array<EventRead> {
    events = events.sort((a, b) => Date.parse(a.created) - Date.parse(b.created));
    const indexesToRemove: Array<number> = [];

    let previousTimeInMs = 0;
    for(let i = 0; i < events.length; i++) {
        const currentTimeInMs = Date.parse(events[i].created);
        const differenceInMs = currentTimeInMs - previousTimeInMs;
        if(i > 0 && (differenceInMs > maxMsBetweenEvents)) break;

        if((!events[i].trip_id || maxMsBetweenEvents > differenceInMs) && events[i].is_tracked) eventsInTrip.push(events[i]);
        indexesToRemove.push(i);
        previousTimeInMs = Date.parse(events[i].created);
    }

    for(let i = indexesToRemove.length - 1; i >= 0; i--) {
        events.splice(i, 1);
    }

    return eventsInTrip;
}

export function getTripsFromEvents(events: Array<EventRead>, estimatedMsBeforeFirstEvent: number, estimatedMsAfterLastEvent: number, trips: Array<Trip> = []): Array<Trip> {
    const eventsInTrip = getEventsInTrip(events, 1000 * 60 * 60);
    if(!eventsInTrip.length) return trips;

    const startTime = new Date(Date.parse(eventsInTrip[0].created));
    const stopTime = new Date(Date.parse(eventsInTrip[eventsInTrip.length - 1].created));
    trips.push({
        startTime: startTime,
        stopTime: stopTime,
        durationInMs: stopTime.getTime() - startTime.getTime(),
        events: eventsInTrip
    });
    return getTripsFromEvents(events, estimatedMsBeforeFirstEvent, estimatedMsAfterLastEvent, trips);
}

export async function getAllUnconfirmedTrips(): Promise<Array<Trip>> {
    const totalEventCount = await EventsService.getCountEventsCountGet(undefined, undefined, undefined, false);
    const allEvents = await EventsService.getAllEventsGet(undefined, undefined, undefined, false, 0, totalEventCount);
    return getTripsFromEvents(allEvents, 1000 * 60 * 5, 1000 * 60 * 10);
}