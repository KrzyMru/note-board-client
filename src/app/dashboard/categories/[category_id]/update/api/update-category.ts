import { fetchWithRefresh } from "@/app/utils/fetch-with-refresh";
import { UpdateCategoryFormData } from "../types";
import { Category } from "../../../types";

const updateCategory = async (formData: UpdateCategoryFormData): Promise<Category> => {
    const response = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_SERVER_URL}/category/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    });

    if (!response.ok)
        throw response.status;

    const data = await response.json();
    return data;
}

export { updateCategory }