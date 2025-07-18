import { fetchWithRefresh } from "@/app/utils/fetch-with-refresh";
import { NoteSnippet } from "../../../notes/types"; 

const getCategoryNoteSnippets = async (categoryId: number): Promise<NoteSnippet[]> => {
    const response = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_SERVER_URL}/category/notes/${categoryId}`, {
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

export { getCategoryNoteSnippets }