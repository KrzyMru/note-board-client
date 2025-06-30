import { fetchWithRefresh } from "@/app/utils/fetch-with-refresh";
import { Category } from "../../types";

const getCategory = async (categoryId: number): Promise<Category> => {
    const response = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_SERVER_URL}/category/${categoryId}`, {
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

export { getCategory }