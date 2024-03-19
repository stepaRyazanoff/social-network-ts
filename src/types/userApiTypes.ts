type Nullable<T> = null | T

interface Photos {
    small: string
    large: string
}

interface Users {
    id: number
    name: string
    status: string
    photos: Photos
    followed: boolean
}

export interface Items {
    items: Users[]
    totalCount: number
    error: Nullable<string>
}