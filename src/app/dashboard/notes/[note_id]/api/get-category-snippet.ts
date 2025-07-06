import { CategorySnippet } from "@/app/dashboard/categories/types";
import { fetchWithRefresh } from "../../../../utils/fetch-with-refresh";

const getCategorySnippet = async (categoryId: number): Promise<CategorySnippet> => {
    const response = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_SERVER_URL}/category/snippet/${categoryId}`, {
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

export { getCategorySnippet }