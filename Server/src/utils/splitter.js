export const textSplitter = (text, { maximumChunkSize = 500 } = {}) => {
  const words = text.split(' ')
  const chunks = [[]]
  let currentChunkIndex = 0
  for (const word of words) {
    if (chunks[currentChunkIndex].length + word.length > maximumChunkSize) {
      chunks.push([word])
      chunks[currentChunkIndex] = chunks[currentChunkIndex].join(' ')
      currentChunkIndex++
    } else {
      chunks[currentChunkIndex].push(word)
    }
  }
  chunks[currentChunkIndex] = chunks[currentChunkIndex].join(' ')
  return chunks
}
