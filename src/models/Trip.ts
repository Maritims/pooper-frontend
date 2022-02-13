import type { EventRead } from "../api";

export type Trip = {
    startTime: Date
    stopTime: Date
    durationInMs: number
    events: Array<EventRead>
};