export const createTextFromTemplate = (
    template,
    inputVariables,
    inputVariableObject
) => {
    for (const key of inputVariables) {
        if (!Object.keys(inputVariableObject).includes(key)) {
            throw new Error(`key "${key}" is not included in input variables.`)
        }
    }
    let text = template
    for (let variable of inputVariables) {
        text = text.replace(`{${variable}}`, inputVariableObject[variable])
    }
    return text
}
