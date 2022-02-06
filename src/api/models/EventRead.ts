/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EventType } from './EventType';

export type EventRead = {
    latitude: number;
    longitude: number;
    animal_id: number;
    event_type: EventType;
    rating?: number;
    id: number;
    created: string;
    animal_name: string;
};
