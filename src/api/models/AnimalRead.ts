/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnimalConditionTypeAssociationRead } from './AnimalConditionTypeAssociationRead';
import type { AnimalEventTypeAssociationRead } from './AnimalEventTypeAssociationRead';
import type { AnimalWeightRead } from './AnimalWeightRead';
import type { ConditionRead } from './ConditionRead';
import type { EventRead } from './EventRead';
import type { NoteRead } from './NoteRead';

export type AnimalRead = {
    name: string;
    is_deactivated?: boolean;
    id: number;
    created: string;
    updated: string;
    tracked_conditions: Array<ConditionRead>;
    tracked_events: Array<EventRead>;
    notes: Array<NoteRead>;
    tracked_condition_types: Array<AnimalConditionTypeAssociationRead>;
    tracked_event_types: Array<AnimalEventTypeAssociationRead>;
    weight_history: Array<AnimalWeightRead>;
};
