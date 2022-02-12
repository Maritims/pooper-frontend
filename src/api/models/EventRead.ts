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
    created: string;
    id: number;
    created_by_user_id: number;
    created_by_user_name: string;
    animal_name: string;
};
