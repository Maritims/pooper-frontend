/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EventType } from './EventType';

export type AnimalEventTypeAssociationRead = {
    animal_id: number;
    event_type: EventType;
    created: string;
    created_by_user_id: number;
    updated: string;
    updated_by_user_id: number;
};
