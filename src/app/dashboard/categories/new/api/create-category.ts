import { fetchWithRefresh } from "@/app/utils/fetch-with-refresh";
import { Category } from "../../types";
import { NewCategoryFormData } from "../types";

const createCategory = async (formData: NewCategoryFormData): Promise<Category> => {
    const response = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_SERVER_URL}/category/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
    });

    if (!response.ok)
        throw response.status;

    const data = await response.json();
    return data;
}

export { createCategory }