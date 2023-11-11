import axios from 'axios'
import * as cheerio from 'cheerio'

export const siteToText = async (url) => {
    const { data: html } = await axios.get(url)
    const docs = cheerio.load(html)
    return removeEscapeSequencesSpecialCharactersAndBrackets(docs('p').text())
}

function removeEscapeSequencesSpecialCharactersAndBrackets(text) {
    text = text.replace(/\\[^\s]/g, '')
    return text
}
