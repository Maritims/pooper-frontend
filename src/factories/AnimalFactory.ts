import type { AnimalCreate } from "../api";

export function getAnimalCreate(): AnimalCreate {
    return {
        name: '',
        is_deactivated: false,
        condition_types_to_track: [],
        event_types_to_track: []
    }
};