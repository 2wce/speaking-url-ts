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
    input = input.replace(
      FIND_FIRST_CHAR_AND_REST_OF_WORD,
      (_, firstChar, rest) => {
        // Capitalize the first character and append the rest of the word
        const word = firstChar.toUpperCase() + rest
        const lowerCaseWord = word.toLowerCase()

        const output =
          lowerCaseWord in custom
            ? (custom as Record<string, string>)[lowerCaseWord]
            : word

        // Apply custom transformation if the word is in the custom object, otherwise return the word in title case
        return output
      }
    )
  }

  return input
}
