import { fetchWithRefresh } from "@/app/utils/fetch-with-refresh";
import { Note } from "../../types";
import { NewNoteFormData } from "../types";

const createNote = async (formData: NewNoteFormData): Promise<Note> => {
    const response = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_SERVER_URL}/note/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
    });

    if (!response.ok)
        throw response.status;

    const data = await response.json();
    return data;
}

export { createNote }