import type { AnimalCreate } from "../api";

export function getAnimalCreate(): AnimalCreate {
    return {
        name: '',
        is_deactivated: false,
        event_types_to_track: []
    }
};