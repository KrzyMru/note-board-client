import { fetchWithRefresh } from "@/app/utils/fetch-with-refresh";
import { TogglePinNoteApiResponse } from "./types";

const togglePinNote = async (noteId: number): Promise<TogglePinNoteApiResponse> => {
    const response = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_SERVER_URL}/note/${noteId}/toggle-pin`, {
        method: "PUT",
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

export { togglePinNote }