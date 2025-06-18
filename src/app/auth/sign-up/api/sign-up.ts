import { AuthApiResponse, AuthFormData } from "../../types";

const signUp = async (props: AuthFormData): Promise<AuthApiResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/sign-up`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(props),
    });
    const data = await response.json();
    if (!response.ok)
        throw new Error(data);
    return data;
}

export { signUp }