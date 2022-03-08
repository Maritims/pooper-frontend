import { ConditionType } from "../api";

export type EnrichedConditionType = {
    conditionType: ConditionType,
    iconClass: string
};

export function getEnrichedConditionType(conditionType: ConditionType): EnrichedConditionType {
    switch(conditionType) {
        case ConditionType.HEAT: return {
            conditionType: conditionType,
            iconClass: 'fa-fire'
        };
        case ConditionType.HOME: return {
            conditionType: conditionType,
            iconClass: 'fa-home'
        };
    }
};