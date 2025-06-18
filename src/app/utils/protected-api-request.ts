const protectedApiRequest = async (url: string, requestInit: RequestInit = {}) => {
    const response = await fetch(url, {
        ...requestInit,
        credentials: "include",
    });

    // Try to refresh access token if expired
    if (response.status === 401) {
        const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/refresh`, {
            method: "POST",
            credentials: "include"
        });
    
        if (refreshResponse.ok)
            return protectedApiRequest(url, requestInit);
        else
            window.location.href = "/auth/sign-in";
    }

    if (response.ok)
        return response.json();
    else
        throw new Error("API request failed");
};

export { protectedApiRequest }