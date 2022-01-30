import { EventType } from "../api";
import { EnrichedEventType, getEnrichedEventType } from "../models/EnrichedEventType";

export const getAllEventTypes = (): Array<EnrichedEventType> => Object.values(EventType).map(eventType => getEnrichedEventType(eventType));