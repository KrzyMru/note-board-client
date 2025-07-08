import { Note } from "../../types"

interface DeleteNoteApiResponse {
    message: string,
}

interface TogglePinNoteApiResponse {
    note: Note,
    message: string,
}

export type { DeleteNoteApiResponse, TogglePinNoteApiResponse }