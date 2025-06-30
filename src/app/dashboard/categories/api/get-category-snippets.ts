import { fetchWithRefresh } from "@/app/utils/fetch-with-refresh";
import { CategorySnippet } from "../types";

const getCategorySnippets = async (): Promise<CategorySnippet[]> => {
    const response = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_SERVER_URL}/category/snippets`, {
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

export { getCategorySnippets }