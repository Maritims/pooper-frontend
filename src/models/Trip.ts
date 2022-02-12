import type { EventRead } from "../api";

export type Trip = {
    date: Date
    durationInMs: number
    events: Array<EventRead>
};