export const required = (value) => value ? undefined : 'Field is required!'

export const maxLength = maxLength => {
    return value => {
        return value && value.length > maxLength
            ? `Error! Max length is ${maxLength} symbols`
            : undefined
    }
}



