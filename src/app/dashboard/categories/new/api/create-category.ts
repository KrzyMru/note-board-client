import { fetchWithRefresh } from "@/app/utils/fetch-with-refresh";
import { NewCategoryFormData } from "../types";
import { NewCategoryApiResponse } from "./types";

const createCategory = async (formData: NewCategoryFormData): Promise<NewCategoryApiResponse> => {
    const response = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_SERVER_URL}/category/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
    });

    const data = await response.json();
    if (!response.ok)
        throw new Error(data?.message);

    return data;
}

export { createCategory }