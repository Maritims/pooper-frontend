/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EventType } from './EventType';

export type EventCreate = {
    latitude: number;
    longitude: number;
    animal_id: number;
    event_type: EventType;
};
