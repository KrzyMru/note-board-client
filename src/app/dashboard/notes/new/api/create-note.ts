import { fetchWithRefresh } from "@/app/utils/fetch-with-refresh";
import { NewNoteFormData } from "../types";
import { NewNoteApiResponse } from "./types";

const createNote = async (formData: NewNoteFormData): Promise<NewNoteApiResponse> => {
    const response = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_SERVER_URL}/note/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
    });

    const data = await response.json();
    if (!response.ok)
        throw new Error(data?.message);

    return data;
}

export { createNote }