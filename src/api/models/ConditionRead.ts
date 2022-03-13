/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConditionType } from './ConditionType';

export type ConditionRead = {
    animal_id: number;
    condition_type: ConditionType;
    is_enabled: boolean;
    id: number;
    created: string;
    updated: string;
};
