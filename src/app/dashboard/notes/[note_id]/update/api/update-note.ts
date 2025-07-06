import { fetchWithRefresh } from "@/app/utils/fetch-with-refresh";
import { UpdateNoteFormData } from "../types";
import { UpdateNoteApiResponse } from "./types";

const updateNote = async (formData: UpdateNoteFormData): Promise<UpdateNoteApiResponse> => {
    const response = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_SERVER_URL}/note/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok)
        throw new Error(data?.message);

    return data;
}

export { updateNote }