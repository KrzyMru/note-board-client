import { Note } from "../../types";

interface NewNoteApiResponse {
    note: Note,
    message: string,
}

export type { NewNoteApiResponse }