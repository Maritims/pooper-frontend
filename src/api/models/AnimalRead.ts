/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EventRead } from './EventRead';

export type AnimalRead = {
    name: string;
    is_deactivated?: boolean;
    id: number;
    created: string;
    updated: string;
    events: Array<EventRead>;
};
