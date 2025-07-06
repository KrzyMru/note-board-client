import { AuthApiResponse, AuthFormData } from "../../types";

const signUp = async (formData: AuthFormData): Promise<AuthApiResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/sign-up`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok)
        throw new Error(data?.message);

    return data;
}

export { signUp }