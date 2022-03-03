/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EventType } from './EventType';

export type AnimalCreate = {
    name: string;
    is_deactivated?: boolean;
    event_types_to_track: Array<EventType>;
};
