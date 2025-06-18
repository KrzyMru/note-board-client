interface AuthFormData {
    email: string,
    password: string,
}

interface AuthApiResponse {
    message: string,
}

interface ApiErrorResponse {
    message: string,
}

export type { AuthFormData, AuthApiResponse, ApiErrorResponse }