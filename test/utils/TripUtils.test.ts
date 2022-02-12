import { describe, expect, it } from '@jest/globals';
import { getTripEvents, getTripFromEvents, getTripsFromEvents } from '../../src/utils/TripUtils';
import mockEvents from '../data/events';

describe('getTripEvents', () => {
  it('should get trip events', () => {
    const events = [...mockEvents];
    const identifiedEvents = getTripEvents(events, 1000 * 60 * 60);
    
    expect(identifiedEvents.length).toBe(5);
  });
});

describe('getTripFromEvents', () => {
  it('should get trip with date, duration and events', () => {
    const events = [...mockEvents];
    const identifiedEvents = getTripEvents(events, 1000 * 60 * 60);
    const trip = getTripFromEvents(identifiedEvents, 1000 * 60 * 5, 1000 * 60 * 10);

    expect(trip.durationInMs).toBe(945000);
    expect(trip.events.length).toBe(5);
    expect(trip.date.toISOString()).toBe('2022-01-29T00:13:21.000Z');
  });
});

describe('getTripsFromEvents', () => {
  it('should get all trips from events', () => {
    const events = [...mockEvents];
    const trips = getTripsFromEvents(events, 1000 * 60 * 5, 1000 * 60 * 10);

    expect(trips.length).toBe(32);
  });
});

