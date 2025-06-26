interface AuthFormData {
    email: string,
    password: string,
}

interface AuthApiResponse {
    message: string,
}

export type { AuthFormData, AuthApiResponse }