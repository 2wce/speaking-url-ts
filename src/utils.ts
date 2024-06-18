import {
  DEFAULT_ALLOWED_CHARACTERS,
  MARK_CHARACTERS,
  URIC_CHARACTERS,
  URIC_NO_SLASH_CHARACTERS
} from './dictionaries.js'
import { SlugOptions } from './get-slug.js'

/**
 * Escapes special characters in a string for use in a regular expression.
 * @param input The string to escape.
 * @returns The escaped string.
 */
export const escapeChars = (input: string) => {
  // Escape all special characters except hyphen
  return input.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

/**
 * Checks if the character is an already converted character from a custom list.
 *
 * @param ch The character to check.
 * @param customReplacements A record of custom replacements where the key is the original character and the value is the replacement character.
 * @returns True if the character is a value in the customReplacements object, false otherwise.
 */
export const isReplacedCustomChar = (
  ch: string,
  customReplacements: Record<string, string>
) => {
  // Convert to Set for efficient lookup if this function is called multiple times
  // @TODO: Consider doing this conversion outside the function if customReplacements doesn't change
  return new Set(Object.keys(customReplacements)).has(ch)
}

export const defaultOptions: SlugOptions = {
  lang: 'en',
  separator: '-',
  maintainCase: false,
  titleCase: false,
  symbols: true,
  custom: {},
  mark: false,
  truncate: false,
  uric: false,
  uricNoSlash: false
}

export const cleanupInput = (
  input: string,
  { separator = '-', uric, uricNoSlash, mark, custom }: SlugOptions
) => {
  // Escape special characters in the separator
  const escapedSeparator = escapeChars(separator)

  // Base64 characters and separator are always allowed
  let allowedChars = DEFAULT_ALLOWED_CHARACTERS

  if (uric) {
    allowedChars += URIC_CHARACTERS
  }

  if (uricNoSlash) {
    allowedChars += URIC_NO_SLASH_CHARACTERS
  }

  if (mark) {
    allowedChars += MARK_CHARACTERS
  }

  if (custom && Object.keys(custom).length > 0) {
    // Add custom characters to allowed characters
    allowedChars += escapeChars(Object.values(custom).join(''))
  }

  //  replace all whitespace with the separator
  let cleanedInput = input.replace(/\s+/g, separator)

  // Build the regex pattern dynamically to include allowed characters and separator
  const regexPattern = `[^${allowedChars}${escapedSeparator === '-' ? '\\-' : escapedSeparator}]`

  cleanedInput = cleanedInput
    .replace(new RegExp(regexPattern, 'g'), separator) // Replace disallowed characters with separator
    .replace(new RegExp(`^${escapedSeparator}+`), '') // Remove leading separator
    .replace(new RegExp(`${escapedSeparator}+$`), '') // Remove trailing separator
    .replace(new RegExp(`(${escapedSeparator}|\\s)+`, 'g'), separator) // Replace internal separators/whitespace
    .trim()

  return cleanedInput
}
