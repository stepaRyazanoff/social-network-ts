interface AuthData {
    id: number
    email: string
    login: string
}

export interface Auth {
    data: AuthData
    resultCode: number
    messages: string[]
}
