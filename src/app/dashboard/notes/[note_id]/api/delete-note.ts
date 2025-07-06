import { fetchWithRefresh } from "@/app/utils/fetch-with-refresh";
import { DeleteNoteApiResponse } from "./types";

const deleteNote = async (noteId: number): Promise<DeleteNoteApiResponse> => {
    const response = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_SERVER_URL}/note/${noteId}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
        },
        credentials: "include",
    });

    const data = await response.json();
    if (!response.ok)
        throw new Error(data?.message);

    return data;
}

export { deleteNote }