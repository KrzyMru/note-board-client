const fetchWithRefresh = async (url: string, requestInit: RequestInit = {}) => {
    const makeRequest = async () => {
        return await fetch(url, { ...requestInit });
    }

    let response = await makeRequest();
    
    // Try to refresh access token if expired
    if (response.status === 401) {
        const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`, {
            method: "POST",
            headers: { 
                "Accept": "application/json",
            },
            credentials: "include",
        });

        // Failed to refresh token
        if (!refreshResponse.ok)
            window.location.href = "/auth/sign-in";
        
        // Retry original request after refresh
        response = await makeRequest();
    }

    return response;
};

export { fetchWithRefresh }