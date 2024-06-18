import { cleanupInput } from '../utils.js'
import { Transformation } from './index.js'

export const truncate: Transformation = (
  input,
  { truncate, separator, ...rest }
) => {
  const canTruncate =
    separator && typeof truncate === 'number' && input.length > truncate

  if (canTruncate) {
    input = input
      .replace(new RegExp(`\\s*${separator}\\s*`, 'g'), separator)
      .trim()

    // Find the last occurrence of the separator before the truncate limit
    const lastSeparatorIndex = input.lastIndexOf(separator, truncate - 1)
    // Find the last space before the truncate limit to avoid breaking a word
    const lastSpaceIndex = input.lastIndexOf(' ', truncate - 1)
    // Use the furthest valid index for truncation
    let truncateIndex = Math.max(lastSeparatorIndex, lastSpaceIndex)

    if (truncateIndex > 1 && lastSeparatorIndex !== -1) {
      // Ensure truncateIndex is meaningful
      input = input.slice(0, truncateIndex)
    } else {
      // If no valid space or separator is found, adjust logic to remove the whole word
      // Find the first space or separator after the truncate limit to avoid breaking a word
      const nextSpaceIndex = input.indexOf(' ', truncate)
      const nextSeparatorIndex = input.indexOf(separator, truncate)
      let endOfWordIndex = Math.min(
        nextSpaceIndex !== -1 ? nextSpaceIndex : input.length,
        nextSeparatorIndex !== -1 ? nextSeparatorIndex : input.length
      )

      // If the next space or separator is immediately after the truncate limit, use it
      // Otherwise, truncate before the current word starts
      if (endOfWordIndex === truncate) {
        truncateIndex = endOfWordIndex
      } else {
        truncateIndex = truncate
        // Move back to the start of the current word
        while (
          truncateIndex > 0 &&
          input[truncateIndex - 1] !== ' ' &&
          input[truncateIndex - 1] !== separator
        ) {
          truncateIndex--
        }
      }

      // Truncate directly to the adjusted limit
      input = input.slice(0, truncateIndex)
    }

    input = cleanupInput(input, { ...rest, separator, truncate })
  }

  return cleanupInput(input, { ...rest, separator, truncate })
}
