import axios from 'axios'
import * as cheerio from 'cheerio'

export const siteLoader = async (url) => {
  const { data: html } = await axios.get(url)
  const docs = cheerio.load(html)
  return removeEscapeSequencesSpecialCharactersAndBrackets(docs('p').text())
}

function removeEscapeSequencesSpecialCharactersAndBrackets(text) {
  text = text.replace(/\\./g, '')
  text = text.replace(/[^a-zA-Z0-9\s]/g, '')
  text = text.replace(/\[.*?\]/g, '')
  text = text.replace(/\n/g,'')
  return text
}
