import { fetchWithRefresh } from "@/app/utils/fetch-with-refresh";
import { NoteSnippet } from "../types";

const getNoteSnippets = async (): Promise<NoteSnippet[]> => {
    const response = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_SERVER_URL}/note/snippets`, {
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

export { getNoteSnippets }