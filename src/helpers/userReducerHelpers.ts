import {UsersType} from "../redux/usersReducer"

interface ObjProps {
    followed: boolean
}

export const updateUsersArray =
    (items: UsersType[], itemId: number, objPropsName: keyof UsersType, objProps: ObjProps) => {
        return items
            .map(u => u[objPropsName] === itemId
                ? {...u, ...objProps}
                : u)
    }