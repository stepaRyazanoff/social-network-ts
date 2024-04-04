import {IUser} from '../types/commonTypes'

export const updateUsersArray =
    (items: IUser[], itemId: number, objPropsName: keyof IUser, objProps: { followed: boolean }): IUser[] => {
        return items.map(u => u[objPropsName] === itemId
            ? {...u, ...objProps}
            : u)
    }