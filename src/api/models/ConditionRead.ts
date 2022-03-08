/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConditionType } from './ConditionType';

export type ConditionRead = {
    condition_type: ConditionType;
    is_enabled: boolean;
    id: number;
    created: string;
    updated: string;
};
