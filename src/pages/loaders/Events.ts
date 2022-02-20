import { EventType } from "../../api";
import { getEnrichedEventType, type EnrichedEventType } from "../../models/EnrichedEventType";

export const firstColumnClass = 'col-4 col-sm-4 col-md-3 col-xxl-2';
export const secondColumnClass = firstColumnClass;
export const thirdColumnClass = 'col col-md-3 col-xxl-2 d-none d-md-block';
export const fourthColumnClass = 'col-4 col-md-3 col-xxl-6 text-end';

export function getAllEventTypes(): Array<EnrichedEventType> {
    return Object.values(EventType).map(eventType => getEnrichedEventType(eventType));
};