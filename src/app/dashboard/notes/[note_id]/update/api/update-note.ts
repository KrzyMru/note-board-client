import { fetchWithRefresh } from "@/app/utils/fetch-with-refresh";
import { UpdateNoteFormData } from "../types";
import { Note } from "../../../types";

const updateNote = async (formData: UpdateNoteFormData): Promise<Note> => {
    const response = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_SERVER_URL}/note/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    });

    if (!response.ok)
        throw response.status;

    const data = await response.json();
    return data;
}

export { updateNote }