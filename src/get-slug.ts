import { applyTransformations } from './transformations/index.js'
import { defaultOptions } from './utils.js'

export type SlugOptions = {
  // Specifies the language for symbol conversion. Defaults to 'en' (English).
  lang?: string | boolean
  // If true, maintains the original casing of the input string. Defaults to false.
  maintainCase?: boolean
  // An object of custom replacements where each key-value pair represents the character to be replaced and its replacement.
  custom?: Record<string, string> | string[]
  // A number indicating the maximum length of the resulting slug. The slug will be truncated to this length if specified.
  truncate?: number | boolean
  // If true, includes URI characters in the resulting slug.
  uric?: boolean
  // If true, includes URI characters except the slash ('/') in the resulting slug.
  uricNoSlash?: boolean
  // If true, includes URI fragment identifiers and query strings in the resulting slug.
  mark?: boolean
  // If false, disables symbol conversion. Defaults to true.
  symbols?: boolean
  // The character to use as a separator in the resulting slug. Defaults to '-'.
  separator?: string
  // If true or an array of strings, converts the slug to title case. If an array is provided, only the specified words are capitalized.
  titleCase?: string[] | boolean
  onlyBase64?: boolean
}

export type Options = string | SlugOptions

/**
 * Transforms a given input string into a slug, applying various transformations based on the provided options.
 *
 * @param {string} input The input string to be transformed into a slug.
 * @param {Options} [opts] Configuration options for slug generation
 * @return {string} The generated slug.
 */
export const getSlug = (input: string, opts: Options = defaultOptions) => {
  if (typeof input !== 'string') {
    return ''
  }

  if (typeof opts === 'string') {
    opts = { ...defaultOptions, separator: opts } as SlugOptions
  } else {
    opts = { ...defaultOptions, ...opts }
  }

  return applyTransformations(input, opts)
}
