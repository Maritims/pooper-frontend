/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnimalEventTypeAssociationRead } from './AnimalEventTypeAssociationRead';
import type { EventRead } from './EventRead';
import type { NoteRead } from './NoteRead';

export type AnimalRead = {
    name: string;
    is_deactivated?: boolean;
    id: number;
    created: string;
    updated: string;
    events: Array<EventRead>;
    notes: Array<NoteRead>;
    tracked_event_types: Array<AnimalEventTypeAssociationRead>;
};
