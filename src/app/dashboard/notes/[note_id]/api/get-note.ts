import { fetchWithRefresh } from "@/app/utils/fetch-with-refresh";
import { Note } from "../../types";

const getNote = async (noteId: number): Promise<Note> => {
    const response = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_SERVER_URL}/note/${noteId}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok)
        throw response.status;

    const data = await response.json();
    return data;
}

export { getNote }