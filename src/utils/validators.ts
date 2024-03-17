export const required = <T>(value: T): string | undefined =>
    value
        ? undefined
        : 'Field is required!'

export const maxLength = <T extends string>(maxLength: number) => (value: T): string | undefined =>
    value && value.length > maxLength
        ? `Error! Max length is ${maxLength} symbols`
        : undefined





