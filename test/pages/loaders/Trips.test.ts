import { describe, expect, it } from '@jest/globals';
import { getEventsInTrip, getTripsFromEvents } from '../../../src/pages/loaders/Trips';
import mockEvents from '../../data/events';

describe('getEventsInTrip', () => {
  it('should get trip events', () => {
    const events = [...mockEvents];
    const eventsInTrip = getEventsInTrip(events, 1000 * 60 * 60);
    expect(eventsInTrip.length).toBe(3);
  });
});

describe('getTripsFromEvents', () => {
  it('should get all trips from events', () => {
    const events = [...mockEvents];
    for(let i = 0; i < 5; i++) {
      events[i].trip_id = 1;
    }
    const trips = getTripsFromEvents(events, 1000 * 60 * 5, 1000 * 60 * 10);
    expect(trips.length).toBe(33);
  });
});