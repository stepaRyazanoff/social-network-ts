export const updateUsersArray = (items, itemId, objPropsName, objProps) => {
    return items
        .map(u => u[objPropsName] === itemId
            ? {...u, ...objProps}
            : u)
}