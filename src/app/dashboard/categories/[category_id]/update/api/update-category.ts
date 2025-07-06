import { fetchWithRefresh } from "@/app/utils/fetch-with-refresh";
import { UpdateCategoryFormData } from "../types";
import { UpdateCategoryApiResponse } from "./types";

const updateCategory = async (formData: UpdateCategoryFormData): Promise<UpdateCategoryApiResponse> => {
    const response = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_SERVER_URL}/category/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok)
        throw new Error(data?.message);

    return data;
}

export { updateCategory }