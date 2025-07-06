import { SignOutApiResponse } from "./types";

const signOut = async (): Promise<SignOutApiResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/sign-out`, {
        method: "POST",
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

export { signOut }