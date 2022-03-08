/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConditionType } from './ConditionType';
import type { EventType } from './EventType';

export type AnimalCreate = {
    name: string;
    is_deactivated?: boolean;
    condition_types_to_track: Array<ConditionType>;
    event_types_to_track: Array<EventType>;
};
