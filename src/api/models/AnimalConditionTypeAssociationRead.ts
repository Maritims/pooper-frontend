/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConditionType } from './ConditionType';

export type AnimalConditionTypeAssociationRead = {
    animal_id: number;
    condition_type: ConditionType;
    created: string;
    created_by_user_id: number;
    updated: string;
    updated_by_user_id: number;
};
