export const required = (value: undefined | string) => value ? undefined : 'Field is required!'

export const maxLength = (maxLength: number) => {
    return (value: undefined | string) => {
        return value && value.length > maxLength
            ? `Error! Max length is ${maxLength} symbols`
            : undefined
    }
}



