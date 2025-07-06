import { fetchWithRefresh } from "@/app/utils/fetch-with-refresh";
import { DeleteCategoryApiResponse } from "./types";

const deleteCategory = async (categoryId: number): Promise<DeleteCategoryApiResponse> => {
    const response = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_SERVER_URL}/category/${categoryId}`, {
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

export { deleteCategory }