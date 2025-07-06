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

    const data = await response.json();
    if (!response.ok)
        throw new Error(data?.message);

    return data;
}

export { getNote }