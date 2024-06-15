import { Transformation } from './index.js'

const FIND_FIRST_CHAR_AND_REST_OF_WORD = /(\w)(\S*)/g
/**
 * Converts the input string to title case, with an option to apply custom case transformations.
 * */
export const titleCase: Transformation = (
  input,
  { titleCase, custom = {} }
) => {
  if (titleCase) {
    // Use a regular expression to match the first character of each word and the rest of the word separately
    return input.replace(
      FIND_FIRST_CHAR_AND_REST_OF_WORD,
      (_, firstChar, rest) => {
        // Capitalize the first character and append the rest of the word
        const word = firstChar.toUpperCase() + (rest !== null ? rest : '')

        // Check if the word is in the custom transformations list
        return Object.keys(custom).indexOf(word.toLowerCase()) < 0
          ? word // If not, return the word in title case
          : word.toLowerCase() // If it is, apply the custom transformation
      }
    )
  }

  return input
}
