import { createTextFromTemplate } from "../../utils/prompt.js"

export const summary = () => {
    const template = `
              Generate a summary of our conversation in about 100 words. 
              It should be third's person POV.
            `
    return template
  }

export const mergeSummary = (inputVariableObject)=>{
    const template = `
            You have to merge old summary which is {oldSummary} with new
            summary which is {newSummary}. Merged summary should be under 100 words. 
            It should be third's person POV.`
    const inputVariables = ['oldSummary','newSummary']
    return createTextFromTemplate(template,inputVariables,inputVariableObject)
}