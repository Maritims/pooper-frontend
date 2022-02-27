import type { NoteCreate } from "../api/models/NoteCreate";

export function getNoteCreate(): NoteCreate {
    return {
        animal_id: 0,
        text: ''
    }
}