import { SlugOptions } from './get-slug.js'

/**
 * Escapes special characters in a string for use in a regular expression.
 * @param input The string to escape.
 * @returns The escaped string.
 */
export const escapeChars = (input: string) => {
  return input.replace(/[-\\^$*+?.()|[\]{}/]/g, '\\$&')
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
